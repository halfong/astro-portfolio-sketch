import theme from "@/data/theme";

export default function convertAsteriskToStrongTag(str: string) {
  return str.replace(
    /\*{1,2}(.*?)\*{1,2}/g,
    `<strong class="text-primary-400 font-bold">$1</strong>`
  );
}
