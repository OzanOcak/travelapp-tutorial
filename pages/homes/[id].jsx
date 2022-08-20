import Image from "next/image";
import Layout from "@/components/Layout";
import { PrismaClient } from "@prisma/client";

const prisma_client = new PrismaClient();

export async function getStaticPaths() {
  const homes = await prisma_client.home.findMany({ select: { id: true } });
  return {
    paths: homes.map((home) => ({ params: { id: home.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const home = await prisma_client.home.findUnique({
    where: { id: params.id },
  });
  if (home) {
    return { props: JSON.parse(JSON.stringify(home)) };
  }
  return { redirect: { destination: "/", permanent: false } };
}

const ListedHome = (home = null) => {
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {home?.title ?? ""}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-gray-500">
              <li>
                <span>{home?.guests ?? 0} guests</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{home?.beds ?? 0} beds</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{home?.baths ?? 0} baths</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-6 relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-md overflow-hidden">
          {home?.image ? (
            <Image
              src={home.image}
              alt={home.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>

        <p className="mt-8 text-lg">{home?.description ?? ""}</p>
      </div>
    </Layout>
  );
};

export default ListedHome;