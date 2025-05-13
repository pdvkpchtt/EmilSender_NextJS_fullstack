const TextHref = ({ onClick = () => {}, style = "", text = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`${style} transition duration-[250ms] text-[#00afff] cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default TextHref;
