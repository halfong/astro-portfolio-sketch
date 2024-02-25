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
    "很高兴认识你，我在厂里做过**设计师**，**产品经理**，也在初创企业带领过多个**0-1项目**，最近几年在独立工作、探索**全栈开发**，热衷于设计与构建不断涌现的产品想法。",
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
