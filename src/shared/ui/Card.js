const Card = ({ children, padding = 12, rounded = 20, style = "" }) => {
  return (
    <div
      className={`${style} bg-white dark:bg-[#181d23]`}
      style={{
        padding: padding,
        borderRadius: rounded,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
