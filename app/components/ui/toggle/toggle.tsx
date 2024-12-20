import { motion } from 'framer-motion';
import styles from '../ui/Card.module.css';

interface ToggleProps {
  toggled: boolean;
  setToggled: (value: boolean) => void;
  id: string;
}

const Toggle: React.FC<ToggleProps> = ({ toggled, setToggled, id }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <label className={styles.switch} htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={toggled}
          onChange={() => setToggled(!toggled)}
        />
        <span className={styles.slider}></span>
      </label>
    </motion.div>
  );
};

export default Toggle;