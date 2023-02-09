import { Dna } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      wrapperClass="dna-wrapper"
    />
  );
};
export default Loader;
