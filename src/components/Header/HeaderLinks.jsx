import React from "react";
// import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { withRouter } from "react-router-dom";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false,
    inpValu: undefined
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  searchHandle = value => {
    const searchText = value || this.state.inpValu;
    console.log("searchText", searchText);
    // if search not exist
    if (!searchText || searchText === undefined) {
      return;
    }
    // address start 'A'
    if (searchText.replace(/\s+/g, "").substring(0, 1) === "A") {
      console.log("address");
      this.props.history.push(`/address/${searchText}`);
      return;
    }

    //txid lenght  64 or 66
    if (searchText.length === 64 || searchText.length === 66) {
      //console.log('/traninfo.html?id=' + (this.search.length === 66 ? this.search : `0x${this.search}`))
      this.props.history.push(`/transaction/${searchText}`);
      return;
    }

    //block height only contains number
    if (/^\d+$/.test(searchText)) {
      this.props.history.push(`/block/${searchText}`);
      return;
    }

    console.log("end");
  };

  handelChange(value) {
    console.log("value", value);
    this.setState({
      inpValu: value
    });
  }
  render() {
    const { classes } = this.props;
    // const { open } = this.state;
    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
            handelChange={this.handelChange.bind(this)}
            handleKeyUp={this.searchHandle.bind(this)}
          />
          <Button
            color="white"
            aria-label="edit"
            justIcon
            round
            onClick={this.searchHandle}
          >
            <Search />
          </Button>
        </div>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(headerLinksStyle)(withRouter(HeaderLinks));
