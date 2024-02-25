export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    icon: 'holli',
    title: "Holli.cc / English learner's AI mate",
    techs: ["ReactJS","Nodejs","Mysql"],
    link: "https://holli.cc",
  },
  {
    icon:'bejolly',
    title: "边界旅行 / 本地营销收客神器",
    techs: ["Trao(微信小程序)", "PHP","Mysql"],
    link: "https://www.bjlx.top/",
  },
];

export default projects;
