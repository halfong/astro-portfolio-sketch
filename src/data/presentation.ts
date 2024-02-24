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
  profile: "https://avatars.githubusercontent.com/u/2819116?v=4",
  description:
    "你好, i'm a *french frontend developer* with over *3 years* of web experience. I am currently working with *NextJS and Typescript*. Outside of work I complete my pokemon card collection and learning TypeScript.",
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
    { label:'故事', href:'/posts' }
  ]
};


export default presentation;
