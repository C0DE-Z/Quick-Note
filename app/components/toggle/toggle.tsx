import { motion } from 'framer-motion';

interface ToggleProps {
  toggled: boolean;
  setToggled: (value: boolean) => void;
  id: string;
}

const Toggle: React.FC<ToggleProps> = ({ toggled, setToggled, id }) => {
  return (
    <motion.div 
      style={{
        padding: '1rem',
        backgroundColor: '#2d2d2d',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <label
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '60px',
          height: '34px',
        }}
        htmlFor={id}
      >
        <input
          type="checkbox"
          id={id}
          checked={toggled}
          onChange={() => setToggled(!toggled)}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
        <span
          style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: toggled ? '#4a4a4a' : '#ccc',
            transition: '.4s',
            borderRadius: '34px',
          }}
        ></span>
        <span
          style={{
            position: 'absolute',
            content: '""',
            height: '26px',
            width: '26px',
            left: '4px',
            bottom: '4px',
            backgroundColor: 'white',
            transition: '.4s',
            borderRadius: '50%',
            transform: toggled ? 'translateX(26px)' : 'translateX(0)',
          }}
        ></span>
      </label>
    </motion.div>
  );
};

export default Toggle;
