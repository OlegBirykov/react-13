import PropTypes from 'prop-types';

function TaskHeader(props) {
  const { title } = props; 

  return (
    <div className="TaskHeader">
      <h1 className="TaskHeader-title">{title}</h1> 
    </div>
  );
}

TaskHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TaskHeader;
