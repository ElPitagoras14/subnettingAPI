class SubnettingNode {
  constructor(ip, mask, name) {
    this.ip = ip;
    this.mask = mask;
    this.name = name;
  }
}

class Trunk {
  constructor(prev, symbol = null) {
    this.prev = prev;
    this.symbol = symbol;
  }
}

const getTreeInfo = (networks) => {
  const ipList = [];
  const maskList = [];
  const nameList = [];

  networks.forEach((net) => {
    const { name, subnet, mask } = net || {};
    ipList.push(subnet);
    maskList.push(mask);
    nameList.push(name);
  });

  return {
    ipList,
    maskList,
    nameList,
  };
};

const createTree = (root, treeInfo) => {
  const { ipList, maskList, nameList } = treeInfo || {};
  const { node } = createTreeRec(root, 0, ipList, maskList, nameList);
  return node
};

const createTreeRec = (node, n, ipList, maskList, nameList) => {
  if (n == maskList.length) {
    return { node, n };
  }

  const { mask } = node || {};
  if (mask == maskList[n]) {
    return { node, n: n + 1 };
  }

  if (mask < maskList[n]) {
    node.name = null;
    const { node: left, n: n1 } = createTreeRec(
      new SubnettingNode(ipList[n], mask + 1, nameList[n]),
      n,
      ipList,
      maskList,
      nameList
    );
    const { node: right, n: n2 } = createTreeRec(
      new SubnettingNode(ipList[n1], mask + 1, nameList[n1]),
      n,
      ipList,
      maskList,
      nameList
    );
    node.left = left;
    node.right = right;
    return { node, n: n2 };
  }
  if (mask > mask[n]) {
    node.name = "Relleno";
    return { node, n };
  }
};

const showTrunks = (trunk, message) => {
  if (!trunk) {
    return message;
  }
  message.push(trunk.symbol);
  showTrunks(trunk.prev, message);
  return message;
};

const treeToStr = (node, prev, isRight) => {
  let message = "";
  if (!node) {
    return "";
  }

  let prevStr = "    ";
  const trunk = new Trunk(prev, prevStr);
  message += treeToStr(node.right, trunk, true);

  if (!prev) {
    trunk.symbol = "———";
  }else if (isRight) {
    trunk.symbol = ".———";
    prevStr = "   |";
  } else {
    trunk.symbol = "`———";
    prev.symbol = prevStr;
  }
  message += showTrunks(trunk, []).reverse().join("");
  const nodeInfo = node.name ? `${node.mask}-${node.name}` : node.mask
  message += ` ${nodeInfo}\n`;

    if (prev) {
    prev.symbol = prevStr;
  }
  trunk.symbol = "   |";
  message += treeToStr(node.left, trunk, false);
  return message;
};

module.exports = {
  SubnettingNode,
  createTree,
  getTreeInfo,
  treeToStr,
};
