import Head from 'next/head';

const HeadTag = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
    );
};

export default HeadTag;
