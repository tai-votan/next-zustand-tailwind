import React from "react";
import useTranslation from "next-translate/useTranslation";

import { Icon } from "./common";
import LINK from "~/configs/link";

export const Footer = React.memo(function Footer() {
    const { t } = useTranslation("common");
    return (
        <>
            <footer className="fixed bottom-0 inset-x-0 z-50 flex justify-between after:absolute after:top-0 after:inset-x-0 after:border-b after:border-slate-800">
                <div className="flex">
                    <div className="px-6 py-2 flex items-center justify-center">{t("find_me")}</div>
                    <div className="border-r border-slate-800 flex">
                        <a
                            {...LINK.linkedIn}
                            className="border-l border-slate-800 px-2.5 py-2 flex items-center justify-center"
                        >
                            <Icon name="linkedin" />
                        </a>
                        <a
                            {...LINK.github}
                            className="border-l border-slate-800 px-2.5 py-2 flex items-center justify-center"
                        >
                            <Icon name="github" />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
});
