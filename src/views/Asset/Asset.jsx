import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { getRandomColor } from "utils/index.jsx";

class Asset extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    const arr = [
      {
        name: "名称",
        value: "NEO",
        link: ""
      },
      {
        name: "符号",
        value: "NEO",
        link: ""
      },
      {
        name: "类型",
        value: "GoverningToken",
        link: ""
      },
      {
        name: "总量",
        value: "100000000",
        link: ""
      }
    ];
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                  资产hash:40ced4022bcc9ddf3fc4f929ef8a410c727020a975343df7
                </h4>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {arr.map(item => {
            return (
              <GridItem xs={12} sm={6} md={4} key={item.name}>
                <Card>
                  <CardHeader color={getRandomColor()} stats icon>
                    <CardIcon color={getRandomColor()}>
                      <Icon>explore</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>{item.name}</p>
                  </CardHeader>
                  <CardBody>
                    <h3 className={classes.cardTitle}>{item.value}</h3>
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
        </GridContainer>
      </div>
    );
  }
}

Asset.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Asset);
