import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  pagination: {
    width: "100%",
    textAlign: "center"
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Pagination extends React.Component {
  state = {
    initPage: 1,
    pageCount: 20,
    beforeStatus: true,
    nextStatus: false
  };

  componentDidMount() {}
  UNSAFE_componentWillReceiveProps(newProps) {
    const pageCounts = Math.ceil(
      parseFloat(newProps.counts / this.state.pageCount)
    );
    if (pageCounts === 1) {
      this.setState({
        nextStatus: true
      });
    }
  }
  // 上一页
  setUp = () => {
    const pageCounts = Math.ceil(
      parseFloat(this.props.counts / this.state.pageCount)
    );

    const beforePage = this.state.initPage - 1;

    if (beforePage > 1) {
      this.setState({
        beforeStatus: false
      });
    }

    if (beforePage === 1) {
      this.setState({
        beforeStatus: true
      });
    }

    if (beforePage < pageCounts) {
      this.setState({
        nextStatus: false
      });
    }

    this.props.ajaxFun(beforePage, this.state.pageCount);

    this.setState({
      initPage: beforePage
    });
  };
  // 下一页
  setNext = () => {
    const pageCounts = Math.ceil(
      parseFloat(this.props.counts / this.state.pageCount)
    );
    console.log("setNext", pageCounts);
    const nextPage = this.state.initPage + 1;

    if (nextPage > 1) {
      this.setState({
        beforeStatus: false
      });
    }

    if (nextPage === pageCounts) {
      this.setState({
        nextStatus: true
      });
    }

    this.props.ajaxFun(nextPage, this.state.pageCount);

    this.setState({
      initPage: nextPage
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.pagination}>
        <Button
          disabled={this.state.beforeStatus}
          variant="fab"
          color="primary"
          className={classes.button}
          aria-label="navigate_before"
          onClick={this.setUp}
        >
          <Icon>navigate_before</Icon>
        </Button>
        <Button
          disabled={this.state.nextStatus}
          variant="fab"
          color="primary"
          className={classes.button}
          aria-label="navigate_next"
          onClick={this.setNext}
        >
          <Icon>navigate_next</Icon>
        </Button>
      </div>
    );
  }
}

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  ajaxFun: PropTypes.func,
  counts: PropTypes.number
};

export default withStyles(styles)(Pagination);
