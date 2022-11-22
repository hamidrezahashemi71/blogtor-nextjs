import Site from "../../layout/Site";
import type {ReactElement} from "react";
import {getAllWriters} from "../../lib/apis";
import {Writer, AllWriters} from "../../lib/interfaces";

const Writers = (props: AllWriters) => {
  console.log(props.allWriters);
  return <div>Writers</div>;
};



export default Writers;

export async function getStaticProps() {
  const allWriters: Writer[] = await getAllWriters();
  return {
    props: {
      allWriters,
    },
  };
}
