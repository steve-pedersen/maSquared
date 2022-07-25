import * as React from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import { getUser } from "./Api";
import { saveUser } from "../../redux/actions";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      loading: true,
    };
  }

  componentDidMount() {
    try {
      console.log("props userid", this.state.userId);
      getUser()
        .then((res) => {
          console.log("response form getUser: ", res);
          saveUser({
            deviceId: res.deviceId,
            userId: res.userId,
            groupId: res.groupId,
            createdDate: res.createdDate,
            university: res.university,
            pushToken: res.pushToken ?? "",
          });
          this.setState({ userId: res.userId });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } catch (e) {
      console.log("error getting user from api", e);
    } finally {
      // this.setState({loading: false});
    }
  }

  render() {
    if (this.state.loading) {
      return null;
    } else {
      return <View></View>;
    }
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.userId,
  };
}

export default connect(mapStateToProps, {
  saveUser,
})(Loader);
