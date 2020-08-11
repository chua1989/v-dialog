/*
加载所有iconfont字体
 */
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('../fonts', false, /\.svg$/);
requireAll(req);
export default req;
