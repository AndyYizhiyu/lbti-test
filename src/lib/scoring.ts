export type DimensionId =
  | 'D1'
  | 'D2'
  | 'D3'
  | 'D4'
  | 'D5'
  | 'D6'
  | 'D7'
  | 'D8'
  | 'D9'
  | 'D10'

export type OptionKey = 'A' | 'B' | 'C'
export type Level = 'L' | 'M' | 'H'
export type AnswerMap = Record<string, OptionKey>

export type QuestionOption = {
  key: OptionKey
  text: string
  score: 1 | 2 | 3
}

export type Question = {
  id: string
  dimension: DimensionId
  text: string
  options: QuestionOption[]
}

export type EggQuestion = {
  id: string
  text: string
  options: Array<{ key: OptionKey; text: string }>
}

export type Personality = {
  code: string
  englishName: string
  name: string
  tagline: string
  strengths: string
  risks: string
  advice: string
}

export type HiddenPersona = {
  id: string
  name: string
  trigger: string
  copy: string
  advice: string
}

export type LbtiResult = {
  type: Personality
  hiddenPersonas: HiddenPersona[]
  rawScores: Record<DimensionId, number>
  dimensionLevels: Record<DimensionId, Level>
  axes: {
    heat: 'H' | 'C'
    distance: 'F' | 'B'
    expression: 'D' | 'S'
    initiative: 'A' | 'W'
    market: 'M' | 'N'
  }
  shareText: string
}

export const dimensionLabels: Record<DimensionId, string> = {
  D1: '恋爱投入度',
  D2: '依恋安全感',
  D3: '边界与融合',
  D4: '关系主动性',
  D5: '表达真实度',
  D6: '冲突修复力',
  D7: '现实筛选力',
  D8: '自我价值稳定度',
  D9: '资源与公平敏感度',
  D10: '暧昧边界识别',
}

export const dimensionExplanations: Record<DimensionId, Record<Level, string>> = {
  D1: {
    L: '心动也会先踩刹车，感情不是不能谈，是启动前要先看路况。',
    M: '会投入，但会给自己留余地，属于能爱也能撤的弹性区。',
    H: '一旦认定就容易全功率输出，爱意像开了性能模式。',
  },
  D2: {
    L: '关系里警报器很灵，已读不回都可能触发灾难预案。',
    M: '大多数时候能稳住，偶尔也会被不确定感拉去加班。',
    H: '比较相信关系本身，不会因为一点风吹草动立刻判死刑。',
  },
  D3: {
    L: '更享受高融合关系，喜欢把对方纳入自己的生活内圈。',
    M: '亲密和独立都要一点，边界会跟对象和阶段一起调整。',
    H: '个人空间是刚需，再喜欢也不能把生活合并成一个压缩包。',
  },
  D4: {
    L: '慢热观望居多，喜欢等信号足够明确再行动。',
    M: '有机会会推进，但不会为了恋爱强行冲刺。',
    H: '主动性强，喜欢把好感从聊天推进到真实相处。',
  },
  D5: {
    L: '习惯先照顾气氛，真实需求经常穿着隐身衣出场。',
    M: '会表达，也会看场合，直说和委婉之间来回切换。',
    H: '需求和态度比较明确，不喜欢把恋爱谈成猜谜综艺。',
  },
  D6: {
    L: '冲突后容易冷处理、逃避或在心里反复扣分。',
    M: '愿意修复，但需要合适时机和对方也配合。',
    H: '能把争吵拉回问题本身，愿意复盘、道歉和重新连接。',
  },
  D7: {
    L: '容易被感觉带着走，对明显风险会先开柔光滤镜。',
    M: '既看感觉也看现实，偶尔清醒，偶尔上头。',
    H: '会看长期行为、边界和匹配度，不太吃短期话术。',
  },
  D8: {
    L: '对方态度容易影响自我评价，关系反馈像情绪遥控器。',
    M: '有自己的重心，但遇到重要对象时仍会波动。',
    H: '不太靠恋爱证明自己，单身或恋爱都能保持基本稳定。',
  },
  D9: {
    L: '对付出和资源不太敏感，容易开心就好或事后才觉得不平衡。',
    M: '知道公平重要，但也会看阶段、关系和具体处境。',
    H: '对钱、时间、情绪劳动和承诺投入都很敏感，不喜欢单向供血。',
  },
  D10: {
    L: '容易替暧昧找理由，觉得对方可能只是还没想清楚。',
    M: '会观察，也会给合理解释，不急着贴标签。',
    H: '对养鱼、吊着、越界信号很敏感，闻到一点茶味就会开窗通风。',
  },
}

const q = (
  id: string,
  dimension: DimensionId,
  text: string,
  options: [string, string, string],
  scores: [1 | 2 | 3, 1 | 2 | 3, 1 | 2 | 3],
): Question => ({
  id,
  dimension,
  text,
  options: [
    { key: 'A', text: options[0], score: scores[0] },
    { key: 'B', text: options[1], score: scores[1] },
    { key: 'C', text: options[2], score: scores[2] },
  ],
})

export const questions: Question[] = [
  q('d1_1', 'D1', '你刚和一个人聊得很上头，对方说“下次可以一起去那家店”。你会：', ['先记下来，但不改自己的安排。', '顺手收藏店铺，表面保持正常人类语速。', '已经开始规划穿搭、路线和三种可能剧情。'], [1, 2, 3]),
  q('d1_2', 'D1', '对方连续几天主动分享日常，你的内心系统更像：', ['收到信号，但还要确认是不是礼貌营业。', '好感增加，会更认真回复。', '恋爱 CPU 升温，奶茶第二杯半价都像命运暗示。'], [1, 2, 3]),
  q('d1_3', 'D1', '你发现自己喜欢上一个人，接下来最可能：', ['先放在心里，不影响生活主线。', '适当增加互动，看对方是否靠近。', '进入重点项目模式，聊天见面同步推进。'], [1, 2, 3]),
  q('d1_4', 'D1', '对方约你周末见面，但你原本打算宅家回血。你会：', ['不够确定喜欢就按原计划休息。', '看状态和对方诚意，合适就调整。', '回血可以下辈子，心动窗口期不能错过。'], [1, 2, 3]),
  q('d2_1', 'D2', '对方 5 小时没回消息，晚上解释说“今天太忙”。你第一反应更接近：', ['忙到 5 小时？刑侦频道已自动打开。', '能理解，但会观察是否经常发生。', '如果平时稳定，我相信这次确实是忙。'], [1, 2, 3]),
  q('d2_2', 'D2', '对方临时取消约会，说身体不舒服。你会：', ['嘴上没事，心里怀疑自己是不是不重要。', '关心一下，也看对方后续是否补安排。', '先让 TA 休息，关系不会因一次变动塌方。'], [1, 2, 3]),
  q('d2_3', 'D2', '你看到对方给别人朋友圈点赞很频繁。你更可能：', ['点进主页研究此人是何方神圣。', '有点在意，但不会立刻下结论。', '普通互动不值得开庭审理。'], [1, 2, 3]),
  q('d2_4', 'D2', '对方表达“我最近需要一点自己的时间”。你会：', ['听起来像关系降温预告片。', '有点失落，但愿意问清楚需求。', '能接受，每个人都需要整理生活。'], [1, 2, 3]),
  q('d3_1', 'D3', '恋爱后，对方希望每天睡前固定语音。你会：', ['很喜欢，像给关系上每日签到奖励。', '可以，但太累时希望灵活一点。', '固定打卡会有压力，我更喜欢自然联系。'], [1, 2, 3]),
  q('d3_2', 'D3', '对方想看你的手机相册和聊天记录，说“情侣不该有秘密”。你会：', ['如果能让 TA 安心，我可能会配合。', '可以解释，但不会把隐私全部交出去。', '信任不是开权限，手机不是恋爱体检报告。'], [1, 2, 3]),
  q('d3_3', 'D3', '周末你想独处，对方想整天黏在一起。你更可能：', ['既然恋爱了，就多陪陪 TA。', '一半陪伴，一半留给自己。', '我需要完整个人时间，否则精神断电。'], [1, 2, 3]),
  q('d3_4', 'D3', '对方要求你出门前报备行程。你会：', ['报备没什么，能让对方放心就行。', '重要安排会说，但不想每一步直播。', '我不是外卖骑手，恋爱不需要实时定位。'], [1, 2, 3]),
  q('d4_1', 'D4', '你和喜欢的人聊天气氛不错，但话题快结束了。你会：', ['顺手抛一个下次可聊的话题。', '正常收尾，看看对方会不会再开启。', '直接消失，假装自己只是路过互联网。'], [3, 2, 1]),
  q('d4_2', 'D4', '你想约对方吃饭，最可能的表达是：', ['“这家店不错，周六要不要一起去？”', '“有空可以试试这家。”然后观察接不接球。', '把店铺链接收藏到发霉，也不发出去。'], [3, 2, 1]),
  q('d4_3', 'D4', '相亲对象条件不错，但聊天一般。你会：', ['主动约一次线下，现实互动比文字更准。', '再聊几天，如果还是干就算了。', '聊天不来电就撤，不想硬推项目。'], [3, 2, 1]),
  q('d4_4', 'D4', '朋友说“TA 好像也对你有点意思”。你会：', ['趁热打铁，制造一次自然见面。', '先观察，避免朋友过度解读。', '开始装死，因为越喜欢越不敢动。'], [3, 2, 1]),
  q('d5_1', 'D5', '对方一句玩笑让你不舒服。你会：', ['当下说明这句我听着不太舒服。', '找个气氛没那么紧的时候再说。', '说没事，然后在心里记一笔无形小账。'], [3, 2, 1]),
  q('d5_2', 'D5', '你很想对方陪你，但 TA 没察觉。你会：', ['直接说我今天有点需要你陪我。', '暗示一下，看 TA 懂不懂。', '不说，真正懂我的人应该自动识别。'], [3, 2, 1]),
  q('d5_3', 'D5', '对方送了你一个很喜欢的小礼物。你会：', ['明确夸，告诉 TA 你为什么开心。', '表现得很开心，但不会说太多。', '怕显得太上头，故作冷静。'], [3, 2, 1]),
  q('d5_4', 'D5', '你发现两人的未来规划有差异。你会：', ['找时间摊开聊，差异不说会变地雷。', '先旁敲侧击，确认态度再深入。', '暂时不聊，万一聊完关系没了怎么办。'], [3, 2, 1]),
  q('d6_1', 'D6', '吵架后两个人都冷静下来了。你会：', ['主动约时间复盘，至少把问题说清楚。', '等气氛缓一点，再慢慢恢复沟通。', '看 TA 什么时候意识到错误，我先不动。'], [3, 2, 1]),
  q('d6_2', 'D6', '对方道歉了，但你还委屈。你会：', ['说出我接受道歉，但还需要你理解这部分。', '先接受，后面再看自己能不能消化。', '嘴上翻篇，之后每次吵架都复活。'], [3, 2, 1]),
  q('d6_3', 'D6', '争执中你发现自己也有问题。你会：', ['能承认，关系不是辩论赛冠军争夺战。', '会承认，但需要一点心理建设。', '先赢下这局，反省赛后采访再说。'], [3, 2, 1]),
  q('d6_4', 'D6', '对方沉默不说话，你会：', ['询问是需要时间，还是稍后再谈。', '给一点空间，但心里会不舒服。', '那我也沉默，看谁先破防。'], [3, 2, 1]),
  q('d7_1', 'D7', '对方很会聊天，但每次约见面都含糊。你会：', ['继续沉浸，能聊得开心已经很稀有。', '再给一两次机会，看是否有行动。', '聊天不落地就是云恋爱试用版。'], [1, 2, 3]),
  q('d7_2', 'D7', '相亲对象条件很好，但价值观明显不合。你会：', ['条件这么好，不合也许能磨合。', '继续了解，但重点观察差异。', '硬件再强，系统不兼容也会蓝屏。'], [1, 2, 3]),
  q('d7_3', 'D7', '对方说“我不太会承诺，但我对你挺特别”。你会：', ['特别就够了，承诺听起来太现实。', '听着暧昧，会继续观察行为。', '没有承诺的特别，像没有合同的 offer。'], [1, 2, 3]),
  q('d7_4', 'D7', '你很心动，但朋友提醒对方口碑不太好。你会：', ['他们不了解 TA，我相信感觉。', '不全信传闻，但会放慢节奏。', '心动可以，风控也要开。'], [1, 2, 3]),
  q('d8_1', 'D8', '对方今天态度有点冷。你会：', ['立刻怀疑是不是自己哪里不够好。', '会受影响，但知道可能不是自己的问题。', '先不把别人的状态翻译成自己的失败。'], [1, 2, 3]),
  q('d8_2', 'D8', '一段暧昧没有结果。你更可能：', ['反复复盘自己哪里不值得被选。', '难过一阵，但能慢慢抽离。', '遗憾归遗憾，不把错过写成判决书。'], [1, 2, 3]),
  q('d8_3', 'D8', '对方提出让你降低某个重要底线。你会：', ['如果很喜欢，可能先妥协。', '会纠结，但知道需要认真谈。', '喜欢不是底线清仓的优惠券。'], [1, 2, 3]),
  q('d8_4', 'D8', '单身很久时，你对自己的状态更接近：', ['容易觉得是不是自己哪里有问题。', '偶尔焦虑，但也能维持生活。', '恋爱是加分项，不是身份证明。'], [1, 2, 3]),
  q('d9_1', 'D9', '约会买单时，对方连续几次都默认你承担更多。你会：', ['气氛好就先别破坏感觉。', '会在意，找机会看对方是否也主动付出。', '长期单向付款不可持续。'], [1, 2, 3]),
  q('d9_2', 'D9', '对方经常索要情绪陪伴，但很少接住你的情绪。你会：', ['TA 需要我，说明我很重要。', '会累，但还想再沟通看看。', '单向情绪外包不叫亲密。'], [1, 2, 3]),
  q('d9_3', 'D9', '对方说“真正爱我就不该计较这些”。你会：', ['也许我确实不该太现实。', '爱可以不斤斤计较，但不能什么都不算。', '这句话一出，我的风险雷达开始警报。'], [1, 2, 3]),
  q('d9_4', 'D9', '你认为恋爱中的付出更应该：', ['凭感觉，喜欢时多给一点没关系。', '大致互相，阶段不同可以有弹性。', '长期必须平衡，否则有人会变耗材。'], [1, 2, 3]),
  q('d10_1', 'D10', '对方一边和你暧昧，一边说“我现在不想确定关系”。你会：', ['可能 TA 只是受过伤，我愿意再等等。', '可以等等，但要降低投入。', '不确定关系可以，占用我不行。'], [1, 2, 3]),
  q('d10_2', 'D10', '对方总在深夜找你聊天，白天却像失忆。你会：', ['夜里能想到我，也算特别。', '不太舒服，会看 TA 是否进入正常生活场景。', '深夜限定暧昧，白天自动下架，我不买。'], [1, 2, 3]),
  q('d10_3', 'D10', '对方说“我们只是朋友”，但行为明显越界。你会：', ['也许是我想多了，先顺其自然。', '提醒边界，看看对方反应。', '嘴上朋友、行为恋人，这是关系薛定谔诈骗。'], [1, 2, 3]),
  q('d10_4', 'D10', '你发现对方同时和多人保持暧昧。你会：', ['还没确定关系，好像也不能要求 TA。', '可以理解未确定期，但会重新评估投入。', '鱼塘水质不明，我先上岸擦鞋。'], [1, 2, 3]),
]

export const answerKeys: EggQuestion[] = [
  { id: 'egg_message', text: '如果喜欢的人一天没回你消息，你最像哪种状态？', options: [{ key: 'A', text: '可能忙吧，我先把自己的事做完。' }, { key: 'B', text: '表面没事，实际已经在脑内写完三季分手连续剧。' }, { key: 'C', text: '已读不回？我直接把 TA 从项目排期里移除。' }] },
  { id: 'egg_blind_date', text: '相亲时对方说“我比较随缘”，你的第一反应是？', options: [{ key: 'A', text: '挺好，慢慢了解。' }, { key: 'B', text: '随缘是需求不明确，建议先补 PRD。' }, { key: 'C', text: '随缘但别吊着人，我会观察行动。' }] },
  { id: 'egg_emotion_value', text: '你如何看待“情绪价值”？', options: [{ key: 'A', text: '关系里当然要互相接住。' }, { key: 'B', text: '可以给，但不能无限量续杯。' }, { key: 'C', text: '如果只让我提供不让我被照顾，那就是情绪外包。' }] },
  { id: 'egg_fishpond', text: '当你发现对方疑似在暧昧池里养鱼，你会？', options: [{ key: 'A', text: '先确认事实，再决定沟通。' }, { key: 'B', text: '我会当场变身福尔摩斯。' }, { key: 'C', text: '不撕，默默下桌。' }] },
  { id: 'egg_clear', text: '朋友说你“太清醒了，会不会错过爱情”。你会？', options: [{ key: 'A', text: '也许吧，但我不想把真心投进空气币。' }, { key: 'B', text: '清醒和心动不冲突，我只是慢一点。' }, { key: 'C', text: '错过不一定可怕，错付才是大型连续剧。' }] },
]

export const personalities: Personality[] = [
  { code: 'HFDAM', englishName: 'SPARK', name: '热恋发动机', tagline: '喜欢就启动，爱了就推进', strengths: '热烈、真诚、行动强', risks: '容易把暧昧当开局', advice: '保留热度，也给关系一点观察期。' },
  { code: 'HFDAN', englishName: 'BRAVE', name: '纯爱冲锋队长', tagline: '心动来了，真诚先上桌', strengths: '坦荡、主动、感染力强', risks: '可能过早交付真心', advice: '真诚很好，但别把试探期当终身合约。' },
  { code: 'HFDWM', englishName: 'GUARD', name: '清醒纯爱猎手', tagline: '很上头，但手里有风控表', strengths: '深情且会筛选', risks: '容易显得忽冷忽热', advice: '让对方看见你的认真，而不只是看见你的审核。' },
  { code: 'HFDWN', englishName: 'SCOUT', name: '纯爱观察员', tagline: '心里海啸，表面路过', strengths: '深情、克制、专一', risks: '错过窗口期', advice: '喜欢可以慢一点，但别慢到对方以为你没上线。' },
  { code: 'HFSAM', englishName: 'SUGAR', name: '甜蜜运营官', tagline: '会给糖，也会看数据', strengths: '会照顾气氛、有边界意识', risks: '容易变成关系客服', advice: '别把关系满意度全背到自己身上。' },
  { code: 'HFSAN', englishName: 'HONEY', name: '甜蜜扩音器', tagline: '爱意很多，表达也会转弯', strengths: '让人舒服、情绪价值高', risks: '容易过度迁就', advice: '温柔要给对方，也要给自己留一份。' },
  { code: 'HFSWM', englishName: 'MUSER', name: '被窝恋爱分析师', tagline: '夜里写诗，白天查证据', strengths: '细腻、谨慎、会复盘', risks: '容易内耗过度', advice: '把脑内剧场缩短一点，给现实沟通让路。' },
  { code: 'HFSWN', englishName: 'DREAM', name: '被窝恋爱脑', tagline: '白天正常人，夜里爱情诗人', strengths: '情感细腻、想象力强', risks: '容易脑补和自我消耗', advice: '浪漫可以很满，事实也要跟上。' },
  { code: 'HBDAM', englishName: 'ARROW', name: '直球边界战士', tagline: '喜欢你，但规则先说清楚', strengths: '真诚、有边界、抗风险', risks: '浪漫感可能被流程感稀释', advice: '边界可以说清楚，语气也可以柔软。' },
  { code: 'HBDAN', englishName: 'BLAZE', name: '直球独行侠', tagline: '喜欢你，但我也有我的宇宙', strengths: '直接、独立、效率高', risks: '可能显得不够黏', advice: '偶尔主动表达在意，会让独立不显得冷。' },
  { code: 'HBDWM', englishName: 'VAULT', name: '高冷风控纯爱', tagline: '爱得认真，但先过安检', strengths: '忠诚、慎重、不乱撩', risks: '对方可能觉得你在审人', advice: '风控之外，也要释放一点欢迎信号。' },
  { code: 'HBDWN', englishName: 'ARMOR', name: '高冷纯爱战士', tagline: '爱得认真，但先藏进盔甲', strengths: '长情、克制、可靠', risks: '对方可能读不到信号', advice: '别让盔甲挡住所有真心。' },
  { code: 'HBSAM', englishName: 'TREAT', name: '温柔边界谈判官', tagline: '我喜欢你，但合同精神不能丢', strengths: '温柔、成熟、会沟通', risks: '有时太讲道理', advice: '谈边界时，也留一点撒娇和余温。' },
  { code: 'HBSAN', englishName: 'GRACE', name: '温柔边界派', tagline: '我很喜欢你，但别拆我围墙', strengths: '稳定、舒服、不压迫', risks: '遇到高黏人对象会累', advice: '提前说明你的节奏，能减少误会。' },
  { code: 'HBSWM', englishName: 'SNAIL', name: '慢热视频侦查员', tagline: '慢慢升温，但雷达常开', strengths: '耐心、谨慎、识别力强', risks: '容易把轻松相处变成观察期', advice: '观察够了就给一点真实反馈。' },
  { code: 'HBSWN', englishName: 'SLOW', name: '慢热视频收藏家', tagline: '关系升温像小火慢炖', strengths: '长情、耐心、细水长流', risks: '容易被快节奏市场淘汰', advice: '慢热不是失联，记得让对方知道你还在。' },
  { code: 'CFDAM', englishName: 'DRIVE', name: '清醒推进官', tagline: '感情可以谈，节奏我来控', strengths: '有判断、有行动', risks: '容易像面试官', advice: '推进关系时，别忘了制造轻松感。' },
  { code: 'CFDAN', englishName: 'PULSE', name: '现实直球派', tagline: '喜欢就约，不合就撤', strengths: '干脆、低内耗', risks: '可能缺少暧昧张力', advice: '效率之外，适当保留一点心动空间。' },
  { code: 'CFDWM', englishName: 'CHECK', name: '谨慎确认官', tagline: '先验证，再交心', strengths: '稳妥、少踩坑', risks: '过度验证会降低浪漫', advice: '不是所有问题都需要立刻验收。' },
  { code: 'CFDWN', englishName: 'PROBE', name: '谨慎确认者', tagline: '先观察，再决定要不要交心', strengths: '慢热、可靠', risks: '容易让对方等太久', advice: '适度表达兴趣，避免被误判为无感。' },
  { code: 'CFSAM', englishName: 'CIVIL', name: '体面经营者', tagline: '会爱，也会维护双方体面', strengths: '情绪稳定、擅长经营', risks: '容易把不满包装太久', advice: '体面不是压抑，问题也值得被说出来。' },
  { code: 'CFSAN', englishName: 'EASE', name: '松弛协调员', tagline: '有分寸地靠近，有礼貌地喜欢', strengths: '温和、好相处', risks: '容易不够明确', advice: '别让松弛变成模糊，重要态度要说清。' },
  { code: 'CFSWM', englishName: 'WATCH', name: '温吞风控员', tagline: '不急不抢，先看水质', strengths: '低压、谨慎、可靠', risks: '容易显得兴趣不足', advice: '你可以慢慢来，但别完全不发信号。' },
  { code: 'CFSWN', englishName: 'COZY', name: '温吞观察员', tagline: '不急不抢，慢慢看人', strengths: '温和、低压、可靠', risks: '容易被误判为没兴趣', advice: '在舒适区里，也可以给关系一个小台阶。' },
  { code: 'CBDAM', englishName: 'LOGIC', name: '恋爱产品经理', tagline: '关系也要讲需求、边界和迭代', strengths: '清晰、直接、抗风险', risks: '浪漫感可能不足', advice: '保留清醒，也给浪漫一点不完美空间。' },
  { code: 'CBDAN', englishName: 'COOL', name: '冷静执行官', tagline: '能约会，也能随时下线', strengths: '独立、果断', risks: '亲密温度可能偏低', advice: '效率高很好，但关系需要被感受到。' },
  { code: 'CBDWM', englishName: 'SIGMA', name: '西格玛风控员', tagline: '门禁很严，雷达很贵', strengths: '自洽、冷静、不上头', risks: '入口太窄', advice: '别把所有靠近都默认成风险事件。' },
  { code: 'CBDWN', englishName: 'SOLO', name: '西格玛观察员', tagline: '万花丛中过，手机不开锁', strengths: '独立、自洽、不上头', risks: '亲密表达偏少', advice: '独立很好，但亲密需要一个可见入口。' },
  { code: 'CBSAM', englishName: 'AUDIT', name: '边界温柔审计师', tagline: '有礼貌，也会查账', strengths: '成熟、稳定、尊重人', risks: '容易过度审慎', advice: '不要让审计流程盖过真实相处。' },
  { code: 'CBSAN', englishName: 'PEACE', name: '边界温柔派', tagline: '有礼貌，有分寸，也有退路', strengths: '温柔、成熟、尊重人', risks: '很难快速进入深层亲密', advice: '给别人靠近你的说明书。' },
  { code: 'CBSWM', englishName: 'SAVER', name: '低功耗风控贵族', tagline: '恋爱可以，但别消耗我', strengths: '情绪低耗、识别风险强', risks: '可能太难被打动', advice: '省电模式下也可以保留一点心动通知。' },
  { code: 'CBSWN', englishName: 'CHILL', name: '低功耗单身贵族', tagline: '恋爱可以，别影响我充电', strengths: '自给自足、情绪低耗', risks: '容易让对方觉得被隔离', advice: '如果你愿意靠近，记得把门开一条缝。' },
]

export const hiddenPersonaCatalog: HiddenPersona[] = [
  { id: 'PURE', name: '纯爱战士', trigger: 'D1 高、D7 高', copy: '你不是恋爱脑，你是把真心当成稀缺金属保管。', advice: '保持真诚，也要看对方是否同样认真。' },
  { id: 'RADAR', name: '已读未回侦探', trigger: 'D2 低、彩蛋偏脑补', copy: '别人等回复，你在等宇宙给出判决书。', advice: '把猜测变成一次清晰沟通。' },
  { id: 'SIGMA', name: '恋爱绝缘体', trigger: 'D3 高、D4 低、D8 高', copy: '不是没人能走近你，是你家门禁像核电站。', advice: '独立很好，但亲密需要可见的入口。' },
  { id: 'PM', name: '相亲需求评审官', trigger: 'D7 高、D5 高、D3 高', copy: '你不是来相亲的，你是来做尽调的。', advice: '筛选重要，也要给情绪流动留空间。' },
  { id: 'MOON', name: '赛博月老受害者', trigger: 'D4 高、D6 高', copy: '你撮合别人一套一套，轮到自己开始断网。', advice: '少当关系顾问，多给自己创造机会。' },
  { id: 'TEA', name: '绿茶雷达', trigger: 'D7 高、D10 高', copy: '你不骂人，但你闻得到空气里的茶多酚。', advice: '识别风险后，用事实而不是标签做判断。' },
  { id: 'SEA', name: '海王声呐', trigger: 'D10 高、彩蛋偏识别多人暧昧', copy: '别人看聊天记录，你看见的是一片海域生态图。', advice: '别急着审判，先看事实、边界和承诺。' },
  { id: 'HUNTER', name: '资源猎手', trigger: 'D9 高、D7 高、D5 高', copy: '你不是拜金，你只是拒绝把自己活成免费 DLC。', advice: '重视公平可以，但别把所有真心都换算成成本。' },
  { id: 'SCUM', name: '渣男渣女避雷器', trigger: 'D10 高、D2 低、D8 中低', copy: '你不是敏感，你是被雷劈过之后学会看天气预报。', advice: '保护自己重要，但别让旧伤替新关系判刑。' },
]

const emptyScores = (): Record<DimensionId, number> => ({
  D1: 0,
  D2: 0,
  D3: 0,
  D4: 0,
  D5: 0,
  D6: 0,
  D7: 0,
  D8: 0,
  D9: 0,
  D10: 0,
})

const toLevel = (score: number): Level => {
  if (score <= 6) return 'L'
  if (score <= 9) return 'M'
  return 'H'
}

const findPersonality = (code: string): Personality =>
  personalities.find((personality) => personality.code === code) ?? personalities[0]

export const calculateResult = (answers: Partial<AnswerMap>): LbtiResult => {
  const rawScores = emptyScores()

  questions.forEach((question) => {
    const selectedKey = answers[question.id]
    const option = question.options.find((item) => item.key === selectedKey) ?? question.options[1]
    rawScores[question.dimension] += option.score
  })

  const dimensionLevels = Object.fromEntries(
    Object.entries(rawScores).map(([dimension, score]) => [dimension, toLevel(score)]),
  ) as Record<DimensionId, Level>

  const axes = {
    heat: rawScores.D1 >= 7 ? 'H' : 'C',
    distance: rawScores.D3 <= 6 ? 'F' : 'B',
    expression: rawScores.D5 + rawScores.D6 >= 14 ? 'D' : 'S',
    initiative: rawScores.D4 + rawScores.D8 >= 14 ? 'A' : 'W',
    market: rawScores.D9 + rawScores.D10 >= 14 ? 'M' : 'N',
  } as const

  const type = findPersonality(
    `${axes.heat}${axes.distance}${axes.expression}${axes.initiative}${axes.market}`,
  )

  const hiddenPersonas = hiddenPersonaCatalog.filter((persona) => {
    switch (persona.id) {
      case 'PURE':
        return dimensionLevels.D1 === 'H' && dimensionLevels.D7 === 'H'
      case 'RADAR':
        return dimensionLevels.D2 === 'L' && answers.egg_message === 'B'
      case 'SIGMA':
        return dimensionLevels.D3 === 'H' && dimensionLevels.D4 === 'L' && dimensionLevels.D8 === 'H'
      case 'PM':
        return dimensionLevels.D7 === 'H' && dimensionLevels.D5 === 'H' && dimensionLevels.D3 === 'H'
      case 'MOON':
        return dimensionLevels.D4 === 'H' && dimensionLevels.D6 === 'H'
      case 'TEA':
        return dimensionLevels.D7 === 'H' && dimensionLevels.D10 === 'H'
      case 'SEA':
        return dimensionLevels.D10 === 'H'
      case 'HUNTER':
        return dimensionLevels.D9 === 'H' && dimensionLevels.D7 === 'H' && dimensionLevels.D5 === 'H'
      case 'SCUM':
        return dimensionLevels.D10 === 'H' && dimensionLevels.D2 === 'L' && dimensionLevels.D8 !== 'H'
      default:
        return false
    }
  })

  const shareText = `我测出来是【${type.code} / ${type.englishName} - ${type.name}】。恋爱关键词：${type.strengths}。系统建议我：${type.advice}`

  return {
    type,
    hiddenPersonas,
    rawScores,
    dimensionLevels,
    axes,
    shareText,
  }
}
