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
import { assetApi } from "services/api.jsx";
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

class AssetList extends React.Component {
  state = {
    counts: 0,
    assetlist: []
  };

  componentDidMount() {
    this.getAssetList();
  }
  getAssetList = async (currentPage = 1, pageCount = 20) => {
    try {
      //asset list
      const { rows, count } = (await assetApi(
        undefined,
        currentPage,
        pageCount
      )).data.data.AssetQuery;

      console.log("rows", rows);
      const assetnArr = [];
      rows.forEach(item => {
        assetnArr.push([
          `${item.name ? item.name[0].name : item.symbol}`,
          `${item.type}`,
          `${item.amount}`
        ]);
      });
      this.setState({ assetlist: assetnArr, counts: count });
      console.log("assetnArr", assetnArr);
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
              <h4 className={classes.cardTitleWhite}>资产列表</h4>
              <p className={classes.cardCategoryWhite} />
            </CardHeader>
            <CardBody>
              <Table
                type="asset"
                tableHeaderColor="info"
                tableHead={["名称", "类型", "总量"]}
                tableData={this.state.assetlist}
              />
            </CardBody>
            <CardActions>
              <Pagination
                ajaxFun={this.getAssetList}
                counts={this.state.counts}
              />
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
AssetList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssetList);
