import { Dimensions, StyleSheet } from "react-native";

export const COLOR_PINK = "#fd2b7b";
export const COLOR_ORANGE = "#ff7158";
export const COLOR_WHITE = "#ffffff";
export const COLOR_GRAY = "#424242";
export const COLOR_BLACK = "#000000";

export const DIMENSION_WIDTH = Dimensions.get("window").width;
export const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const globalStyles = StyleSheet.create({
  bg: {
    flex: 1,
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT,
    backgroundColor: "#ffffff",
  },

  // COMPONENT - CARD ITEM
  containerCardItem: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: COLOR_BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesCardItem: {
    marginTop: -35,
    backgroundColor: COLOR_PINK,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  matchesTextCardItem: {
    color: COLOR_WHITE,
  },
  descriptionCardItem: {
    color: COLOR_GRAY,
    textAlign: "center",
  },
  status: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    color: COLOR_GRAY,
    fontSize: 12,
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: COLOR_PINK,
    borderRadius: 3,
    marginRight: 4,
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: COLOR_ORANGE,
    borderRadius: 3,
    marginRight: 4,
  },
  actionsCardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLOR_WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: COLOR_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: COLOR_WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: COLOR_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },

  // COMPONENT - CITY
  city: {
    backgroundColor: COLOR_WHITE,
    padding: 10,
    borderRadius: 20,
    width: 100,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: COLOR_BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  cityText: {
    color: COLOR_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - FILTERS
  filters: {
    backgroundColor: COLOR_WHITE,
    padding: 10,
    borderRadius: 20,
    width: 90,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: COLOR_BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  filtersText: {
    color: COLOR_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - MESSAGE
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },

  // COMPONENT - PROFILE ITEM
  containerProfileItem: {
    backgroundColor: COLOR_WHITE,
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: COLOR_BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesProfileItem: {
    width: 135,
    marginTop: -15,
    backgroundColor: COLOR_PINK,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  matchesTextProfileItem: {
    color: COLOR_WHITE,
    textAlign: "center",
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: COLOR_GRAY,
    fontSize: 15,
    textAlign: "center",
  },
  descriptionProfileItem: {
    color: COLOR_GRAY,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 13,
  },
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconProfile: {
    fontSize: 12,
    color: COLOR_GRAY,
    paddingHorizontal: 10,
  },
  infoContent: {
    color: COLOR_GRAY,
    fontSize: 13,
  },

  // CONTAINER - GENERAL

  top: {
    paddingTop: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { paddingBottom: 10, fontSize: 22, color: COLOR_GRAY },

  // CONTAINER - MATCHES
  containerMatches: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - MESSAGES
  containerMessages: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - PROFILE
  containerProfile: { marginHorizontal: 0 },
  photo: {
    width: DIMENSION_WIDTH,
    height: 450,
  },
  topIconLeft: {
    paddingLeft: 20,
  },
  topIconRight: {
    paddingRight: 20,
  },
  actionsProfile: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    fontSize: 15,
    color: COLOR_WHITE,
    paddingLeft: 5,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLOR_PINK,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  roundedButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLOR_ORANGE,
    paddingHorizontal: 20,
  },

  // MENU
  tabButtonText: {
    textTransform: "uppercase",
    fontSize: 12,
  },
  iconMenu: {
    alignItems: "center",
    minWidth: 60,
  },
});
