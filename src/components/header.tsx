import { useTheme } from "next-themes";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import LOCALE from "~/configs/locale";
import { Icon, MenuItem } from "./common";
import { Toggle } from "./ui";
import ROUTES from "~/configs/routes";

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const { pathname, asPath, query } = router;
    const { lang } = useTranslation("common");

    const [checked, setChecked] = useState(theme === "dark");

    const toggleDarkMode = useCallback(
        (checked: boolean) => {
            setChecked(checked);
            setTheme(checked ? "dark" : "light");
        },
        [setTheme],
    );

    const toggleLocale = () => {
        router.push({ pathname, query }, asPath, { locale: LOCALE[lang as keyof typeof LOCALE] });
    };

    return (
        <>
            <header className="fixed top-0 inset-x-0 z-50 flex justify-between after:absolute after:bottom-0 after:inset-x-0 after:border-b after:border-slate-800">
                <div className="flex">
                    <MenuItem>
                        <Link href={ROUTES.home}>tai.votan</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={ROUTES.home}>_hello</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={ROUTES.home}>_about-me</Link>
                    </MenuItem>
                </div>
                <div className="flex">
                    <div className="border-l border-slate-900 dark:border-slate-800 w-14 flex items-center justify-center cursor-pointer">
                        <Toggle size="lg" onPressedChange={toggleLocale}>
                            <Icon name="globe-2" />
                        </Toggle>
                    </div>
                    <div className="border-l border-slate-900 dark:border-slate-800 w-14 flex items-center justify-center cursor-pointer">
                        <Toggle size="lg" onPressedChange={toggleDarkMode}>
                            <Icon name={checked ? "sun" : "moon-star"} />
                        </Toggle>
                    </div>
                </div>
            </header>
        </>
    );
};
