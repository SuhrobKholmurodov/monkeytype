import { motion } from 'framer-motion';
import { MetaTags } from '~/components';
import { NotFoundContent } from '~/components/NotFoundContent';

export const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col justify-center items-center dark:bg-gray-200 dark:text-gray-800 bg-gray-900 text-white p-6 overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      <MetaTags
        title="404 - Page Not Found"
        description="The page you are looking for does not exist. Return to the homepage and continue your typing test journey."
        keywords="404, page not found, typing test, Monkeytype, typing practice"
      />
      <NotFoundContent />
    </motion.div>
  );
};
