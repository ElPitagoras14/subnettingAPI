const {
  SubnettingNode,
  createTree,
  getTreeInfo,
  treeToStr,
} = require("../utils/subnetTree");

const createStrSubnetTree = ({ subnettingInfo, networks }) => {
  const { initialIp, initialMask } = subnettingInfo || {};
  const root = new SubnettingNode(initialIp, initialMask);
  const treeInfo = getTreeInfo(networks);
  const completeRoot = createTree(root, treeInfo);
  return treeToStr(completeRoot, null, false);
};

module.exports = {
  createStrSubnetTree,
};
