type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
};

const presentation: Presentation = {
  mail: "0xhalfong@gmail.com",
  title: "嗨, 我是Hal 👋",
  profile: "/avatar.png",
  description:
    "欢迎来访！我在互联网职行业已经**10+年**，从大厂**设计师**到**产品经理**，<br/>带领过多个从**0到1项目**。最近几年持续思考与设计、**全栈开发**，<br/>热衷于实现不断涌现的产品想法！",
  socials: [
    {
      label: null,
      class: 'icon icon-twitter-x',
      link: "https://twitter.com/halfong",
    },
    // {
    //   label: "Bento",
    //   link: "https://bento.me/m-wolff",
    // },
    {
      label: null,
      class: 'icon icon-github',
      link: "https://github.com/halfong",
    },
  ],
  menu : [
    { label:'首页', href:'/' },
    { label:'文章', href:'/posts' }
  ]
};


export default presentation;
