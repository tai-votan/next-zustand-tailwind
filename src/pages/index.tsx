import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";

import { auth } from "~/auth";
import { initializeStore } from "~/store";
import logger from "~/utils/logger";

export default function Home() {
    const { t } = useTranslation("common");
    return <>{t("find_me")}</>;
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export const getServerSideProps: GetServerSideProps = async (context) => {
    const zustandStore = initializeStore();
    const session = await auth(context.req, context.res);
    logger({ value: session, text: "session" });
    return {
        props: {
            session,
            // the "stringify and then parse again" piece is required as next.js
            // isn't able to serialize it to JSON properly
            initialZustandState: JSON.parse(JSON.stringify({ ...zustandStore.getState() })),
        },
    };
};
