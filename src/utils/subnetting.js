const getBitPower = (number) => {
  return Math.ceil(Math.log2(number));
};

const getOctets = (ip) => {
  const octets = ip.split(".");
  const intOctets = octets.map((octect) => {
    return parseInt(octect);
  });
  return intOctets;
};

const addHost = (ip, host) => {
  const octets = getOctets(ip);
  const workingOctets = octets.reverse();
  workingOctets[0] += host;

  const newOctets = workingOctets.map((octect, idx) => {
    if (octect > 255) {
      workingOctets[idx + 1] += Math.floor(octect / 256);
      octect = octect % 256;
    }
    return octect;
  });

  return newOctets.reverse().join(".");
};

const reduceHost = (ip, host) => {
  const octects = getOctets(ip);
  const workingOctets = octects.reverse();
  workingOctets[0] -= host;

  const newOctets = workingOctets.map((octect, idx) => {
    if (octect < 0) {
      workingOctets[idx + 1] += Math.floor(octect / 256);
      octect = (256 + octect) % 256;
    }
    return octect;
  });
  return newOctets.reverse().join(".");
};

const flsmNetwork = (ip, mask, minNetwork) => {
  const networks = [];
  const n = getBitPower(minNetwork);
  const newMask = mask + n;
  const m = 32 - newMask;
  const initialIp = ip;

  for (let i = 0; i < Math.pow(2, n); i++) {
    const network = `Net ${i + 1}`;
    const newIp = addHost(ip, Math.pow(2, m));
    const broadcast = reduceHost(newIp, 1);
    const networkInfo = {
      name: network,
      subnet: ip,
      mask: newMask,
      firstIp: addHost(ip, 1),
      lastIp: reduceHost(broadcast, 1),
      broadcast,
    };
    ip = newIp;
    networks.push(networkInfo);
  }

  const response = {
    subnettingInfo: {
      initialIp,
      initialMask: mask,
      n,
      m,
      numOfNetworks: Math.pow(2, n),
      hostPerNetwork: Math.pow(2, m) - 2,
    },
    networks,
  };

  return response;
};

const flsmHost = (ip, mask, minHost) => {
  const m = getBitPower(minHost + 2);
  const n = 32 - mask - m;

  return flsmNetwork(ip, mask, Math.pow(2, n));
};

const vlsmHost = (ip, mask, hostList) => {
  const fixedHostList = [];
  const networks = hostList.map((host, idx) => {
    const m = getBitPower(host + 2);
    const n = 32 - mask - m;
    const newMask = mask + n;

    const network = `Net ${idx + 1}`;
    const newIp = addHost(ip, Math.pow(2, m));
    const broadcast = reduceHost(newIp, 1);
    const networkInfo = {
      name: network,
      subnet: ip,
      mask: newMask,
      firstIp: addHost(ip, 1),
      lastIp: reduceHost(broadcast, 1),
      broadcast,
    };
    ip = newIp;
    fixedHostList.push(Math.pow(2, m) - 2);
    return networkInfo;
  });

  const response = {
    subnettingInfo: {
      initialIp: ip,
      initialMask: mask,
      initialHostPerNetwork: hostList,
      hostPerNetwork: fixedHostList,
    },
    networks,
  };

  return response;
};

const vlsmSorteredHost = (ip, mask, hostList) => {
  const sortedHostList = hostList.sort().reverse();
  return vlsmHost(ip, mask, sortedHostList);
};

module.exports = {
  flsmHost,
  flsmNetwork,
  vlsmHost,
  vlsmSorteredHost,
};
