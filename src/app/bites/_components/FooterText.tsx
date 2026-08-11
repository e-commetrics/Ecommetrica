type FooterTextProps = {
  className: string;
  hoverColor: string;
};

const FooterText: React.FC<FooterTextProps> = ({ className, hoverColor }) => {
  return (
    <div className={className}>
      <hr />
      <h1 className="py-8 text-center text-lg text-white">
        All rights reserved by Bites Creadores de Sonrisas 2024 ©. Bitescreadoresdesonrisas.com is powered by{" "}
        <a href="https://ecommetrica.com/" className={`${hoverColor} hover:underline`} target="_blank" rel="noreferrer">
          ecommetrica.com
        </a>
      </h1>
    </div>
  );
};

export default FooterText;
