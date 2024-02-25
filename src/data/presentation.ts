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
    "欢迎访问！我在互联网行业已经**10+年**， 从大厂**设计师**到**产品经理**，<br/>带领过多个**0-1项目**，最近几年独立工作、**全栈开发**，<br/>热衷于设计与构建不断涌现的产品想法。",
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
