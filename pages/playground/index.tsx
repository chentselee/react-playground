import { GetStaticProps } from "next";

export default function () {
  return null;
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
    redirect: {
      destination: "/playground/state-management",
      permanent: false,
    },
  };
};
