import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { blockApi } from "services/api.jsx";
import moment from "moment";
import Pagination from "components/Pagination/Pagination.jsx";
import CardActions from "@material-ui/core/CardActions";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class BlockList extends React.Component {
  state = {
    value: 0,
    blocklist: []
  };

  componentDidMount() {
    this.getBlockList();
  }

  getBlockList = async (currentPage = 1, count = 20) => {
    try {
      // block list
      const blockResult = (await blockApi(undefined, currentPage, count)).data
        .data.BlockQuery.rows;
      console.log("blockResult", blockResult);
      const blockArr = [];
      blockResult.forEach(item => {
        blockArr.push([
          `${item.index}`,
          `${item.size}`,
          `${item.transactions}`,
          `${moment(item.time * 1000).format("YYYY-MM-DD | HH:mm:ss")}`
        ]);
      });
      this.setState({ blocklist: blockArr });
      console.log("blockArr", blockArr);
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>最新区块</h4>
              <p className={classes.cardCategoryWhite} />
            </CardHeader>
            <CardBody>
              <Table
                type="block"
                tableHeaderColor="info"
                tableHead={["高度", "大小", "交易数", "时间"]}
                tableData={this.state.blocklist}
              />
            </CardBody>
            <CardActions>
              <Pagination ajaxFun={this.getBlockList} />
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
BlockList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BlockList);
