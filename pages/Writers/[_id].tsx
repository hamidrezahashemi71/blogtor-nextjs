import Site from "../../layout/Site";
import type {ReactElement} from "react";
import {getSingleWriter, getAllWriters, getBlogsByWriter} from "../../lib/apis";
import {SingleWriterProps, SingleWriter} from "../../lib/interfaces";

const SingleWriterPage = ({singleWriter, blogsByWriter}: SingleWriterProps) => {
  if (!singleWriter._id) return <h1>hamchin khari nadarim</h1>;
  return <div>SingleWriter</div>;
};

SingleWriterPage.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default SingleWriterPage;

export async function getStaticPaths() {
  const writers = await getAllWriters();
  const paths = writers.map((writer: any) => ({
    params: {_id: writer._id},
  }));

  return {paths, fallback: "blocking"};
}

export async function getStaticProps({params}: any) {
  const singleWriter: SingleWriter = await getSingleWriter(params._id);
  const blogsByWriter = await getBlogsByWriter(params._id);
  return {
    props: {
      singleWriter,
      blogsByWriter,
    },
    revalidate: 1,
  };
}