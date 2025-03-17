import { GridLoader } from 'react-spinners';

const override = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderColor: 'lightgray',
};

export default function Loader({ loading }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <GridLoader
        color="lightgray"
        loading={loading}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
