import { motion } from 'framer-motion';

interface SliderProps {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
}

const Slider: React.FC<SliderProps> = ({ value, setValue, min, max }) => {
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
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        style={{
          width: '100%',
          appearance: 'none',
          height: '0.5rem',
          background: '#4a4a4a',
          borderRadius: '0.25rem',
          outline: 'none',
          opacity: '0.7',
          transition: 'opacity 0.2s',
        }}
      />
      <span>{value}</span>
    </motion.div>
  );
};

export default Slider;
