const MapPage: React.FC = () => {
  return (
    <main>
      <div className="h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2378.8056264440115!2d-117.011813027693!3d32.52242956839914!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9492cc28763c7%3A0xd545645c91636832!2sBites%20creadores%20de%20sonrisas!5e0!3m2!1ses!2smx!4v1705520929164!5m2!1ses!2smx"
          className="h-full w-full"
          loading="lazy"
        />
      </div>
    </main>
  );
};

export default MapPage;
