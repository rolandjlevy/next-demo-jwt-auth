import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type Auth = {
  isLoggedIn: boolean;
};

export const getServerSideProps = (async ({ req }) => {
  const host = `http://${req.headers.host}`;
  const res = await fetch(`${host}/api/auth`);
  const { isLoggedIn }: Auth = await res.json();
  console.log('######### SSR 3 > isLoggedIn:', isLoggedIn);
  return { props: { isLoggedIn } };
}) satisfies GetServerSideProps<{ isLoggedIn: Auth }>;

export default function ProtectedPage({
  isLoggedIn
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <p>isLoggedIn: {isLoggedIn ? 1 : 0}</p>
    </main>
  );
}
