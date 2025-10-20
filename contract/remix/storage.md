原生提供的storage的合约，这个不需要添加value

添加value会报错
[vm]from: 0x5B3...eddC4to: Storage.(constructor)value: 5000000 weidata: 0x608...e0033logs: 0hash: 0x405...b1518


部署成功，会展示Deployed Contract
点解对应remix上的两个按钮“store”，“retrive”，对应的两个function函数。
其中store是输入一个数字，修改里面的状态量
retrive是一个无参函数，返回一个returns (uint256)，跟go也是入参在前，返回在后。