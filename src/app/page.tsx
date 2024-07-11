import Image from "next/image";
import { H1, H3, P } from "@/components/typography";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Props = {
  title: "TERR48YTE",
  slogan: "TECHNOLOGY WITHOUT LIMITS",
  desc: "TERR48TYE, also known as IT Club, is an extracurricular activity aimed at students with a keen interest and passion in Information Technology. IT Club focuses on various aspects of modern technology learning, including programming (coding), digital art design, and website and application development.",
  img: "/logo.svg",
};

export default function Home() {
  return (
    <div className="flex flex-col-reverse justify-center items-center md:flex-row gap-8">
      <div className="w-full">
        <H1 text={Props.title} />
        <H3 text={Props.slogan} />
        <P text={Props.desc} />
      </div>
      <div className="w-1/2">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={Props.img}
            alt=""
            fill
            className="object-cover dark:invert"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
