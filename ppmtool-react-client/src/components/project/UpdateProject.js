import React, { Component } from 'react';
import { getProject, createProject } from '../../actions/projectionActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { identifier } from '@babel/types';

class UpdateProject extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      projectName: '',
      projectIdentifier: '',
      description: '',
      startDate: '',
      endDate: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate
    } = nextProps.project;

    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate
    });
  }

  componentDidMount() {
    const { identifier } = this.props.match.params;
    this.props.getProject(identifier, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    this.props.createProject(updateProject, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h5 className='display-4 text-center'>Update Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames('form-control form-control-lg ', {
                      'is-invalid': errors.projectName
                    })}
                    placeholder='Project Name'
                    name='projectName'
                    value={this.state.projectName}
                    onChange={this.onChange}
                  />
                  {errors.projectName ? (
                    <div className='invalid-feedback'>{errors.projectName}</div>
                  ) : (
                    <br />
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.projectIdentifier
                    })}
                    placeholder='Unique Project ID'
                    name='projectIdentifier'
                    value={this.state.projectIdentifier}
                    disabled
                  />
                  {errors.projectIdentifier ? (
                    <div className='invalid-feedback'>
                      {errors.projectIdentifier}
                    </div>
                  ) : (
                    <br />
                  )}
                </div>

                <div className='form-group'>
                  <textarea
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.description
                    })}
                    placeholder='Project Description'
                    name='description'
                    value={this.state.description}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.description ? (
                    <div className='invalid-feedback'>{errors.description}</div>
                  ) : (
                    <br />
                  )}
                  <br />
                </div>
                <h6>Start Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='startDate'
                    value={this.state.startDate}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='endDate'
                    value={this.state.endDate}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type='submit'
                  className='btn btn-primary btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  errors: state.errors
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);