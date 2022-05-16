import Head from "next/head";
import { useState } from "react";
import type { NextPage } from "next";

import Calandar from "components/Calendar";
import CalandarNavigantion from "components/CalandarNavigantion";
import { getDate, getDateName } from "services/helpers";
import { MountYearType } from "types";

const Home: NextPage<{ dateName: string } & MountYearType> = ({ dateName, month, year }) => {
  const [mountYear, setMountYear] = useState<MountYearType>({ month, year });

  return (
    <>
      <Head>
        <title>Personal Calendar - {getDateName({ month: mountYear.month, year: mountYear.year })}</title>
      </Head>
      <main className="main">
        <CalandarNavigantion mountYear={mountYear} setMountYear={setMountYear} dateName={dateName} />
        <Calandar mountYear={mountYear} />
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const { month, year } = getDate();
  return {
    props: {
      dateName: getDateName({ month, year }),
      month,
      year,
    },
  };
};

export default Home;
