import { motion } from "framer-motion";
import { History } from "lucide-react";
import { useTranslations } from "next-intl";
import { emptyStyles as s } from "./history.style";

const Empty = () => {
  const t = useTranslations("public");

  return (
    <div className="flex items-center justify-center mt-16 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={s.emptyWrapper}
      >
        <div className={s.emptyIconWrapper}>
          <History className="text-(--muted)" size={28} />
        </div>
        <p className={s.emptyText}>{t("emptyHistory")}</p>
      </motion.div>
    </div>
  );
};

export default Empty;
