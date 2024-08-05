import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type AuthProps = {
  isLoggedIn: boolean;
};

export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
  const res = await fetch(`http://${req.headers.host}/api/auth`);
  const data = await res.json();
  const isLoggedIn: boolean = data.isLoggedIn;
  console.log('######### SSR 3 > isLoggedIn:', isLoggedIn);
  return { props: { isLoggedIn } };
};

export default function ProtectedPage({
  isLoggedIn
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <p>isLoggedIn: {isLoggedIn ? 1 : 0}</p>
    </main>
  );
}
