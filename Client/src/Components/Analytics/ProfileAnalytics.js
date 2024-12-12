import React, { useState, useEffect } from "react";
import "./Analaytics.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { getAttendedAppointments } from "../../Actions/appointmentActions";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
const pdata = [
  {
    month: "January",
    views: 20,
    completedAppointments: 10,
    cancelledAppointments: 3,
  },
  {
    month: "February",
    views: 10,
    completedAppointments: 20,
    cancelledAppointments: 7,
  },
  {
    month: "March",
    views: 13,
    completedAppointments: 16,
    cancelledAppointments: 6,
  },
  {
    month: "April",
    views: 10,
    completedAppointments: 8,
    cancelledAppointments: 19,
  },
  {
    month: "May",
    views: 20,
    completedAppointments: 10,
    cancelledAppointments: 3,
  },
];

const ProfileAnalytics = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [total__completed, setCT] = useState(0);
  const [total__cancelled, setCDT] = useState(0);
  const [completedApp, setCompletedApp] = useState([]);
  const [cancelledApp, setCancelledApp] = useState([]);
  const [views, setViews] = useState(0);
  const [profileData, setProfileData] = useState([]);

  useEffect(async () => {
    let response = await getAttendedAppointments(currentUser.userType);
    if (response.length > 1) {
      console.log(response);
      console.log("completed Appointments>>", response);
      setCompletedApp(response);
      setCT(response?.length);
    }
    api
      .get(`/appointment/cancelled/${currentUser.userType}`)
      .then((res) => {
        console.log("cancelled appointments>", res);
        if (res?.data.length > 1) {
          setCDT(res.data?.length);
          setCancelledApp(res.data);
        }
      })
      .catch((err) => {
        console.log("error while fetching attended appointments ", err);
      });
    api
      .get(`/user/getUserById/${currentUser?.id}`)
      .then((res) => {
        console.log("data>>>>>>>>>>>>>>>>>>>>>", res.data);
        setViews(res.data?.profileViews ? res.data?.profileViews : 0);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    let array = [];
    let dataArray = [];
    let t = new Date(Date.now()).getMonth();
    const start = new Date(`${t + 1}/01/2022`);
    const end = new Date(Date.now());
    let loop = new Date(start);
    while (loop <= end) {
      // console.log(loop);
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
      array.push({
        date: new Date(newDate).toDateString(),
      });
    }
    console.log("dates", array);
    /********** */
    let temp = [];
    let v = 0;
    array.map((a, i) => {
      let isrunonce = false;
      let completedCount = 0;
      let cancelledCount = 0;

      completedApp?.map((r) => {
        if (!isrunonce) {
          if (
            new Date(r?.appointmentDate).setHours(0, 0, 0, 0) <
              new Date(a?.date).setHours(0, 0, 0, 0) ||
            new Date(r?.appointmentDate).setHours(0, 0, 0, 0) >
              new Date(a?.date).setHours(0, 0, 0, 0)
          ) {
          } else {
            completedCount++;
          }
        }
      });
      cancelledApp.map((r) => {
        if (!isrunonce) {
          if (
            new Date(r?.appointmentDate).setHours(0, 0, 0, 0) <
              new Date(a?.date).setHours(0, 0, 0, 0) ||
            new Date(r?.appointmentDate).setHours(0, 0, 0, 0) >
              new Date(a?.date).setHours(0, 0, 0, 0)
          ) {
          } else {
            cancelledCount++;
          }
        }
      });
      // let x = new Date().getDate() - views - 1;
      // console.log("testing date", new Date().getDate() - views);
      // if (new Date(a.date) > new Date(`${t + 1}/${x}/2022`))
      //   v = Math.ceil(v + 1);

      let data = {
        date: a.date,
        completed: completedCount,
        cancelled: cancelledCount,
        views: 0,
      };
      if (i == array.length - 1) {
        data = {
          date: a.date,
          completed: completedCount,
          cancelled: cancelledCount,
          views: views,
        };
      }

      temp.push(data);

      console.log("views>>>>>>>>>>>>>>", views);
    });

    setProfileData(temp);
  }, [completedApp, cancelledApp]);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const changeAnalyticsOptions = (e) => {
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, e.target.name]);
    } else {
      var filteredOptions = selectedOptions.filter(
        (item) => item !== e.target.name
      );
      setSelectedOptions(filteredOptions);
    }
  };
  return (
    <div className="profile__analytics">
      <h1>Profile Analytics</h1>
      <div className="row__one">
        <div>
          {" "}
          <h5>Total Views </h5> <h5>{views}</h5>
        </div>
        <div>
          {" "}
          <h5>Completed Appointments </h5> <h5>{total__completed}</h5>
        </div>
        <div>
          {" "}
          <h5>Cancelled Appointments </h5> <h5>{total__cancelled}</h5>
        </div>
      </div>
      {/* <div style={{ display: "flex", gap: "30px" }}> */}
      {/* <div className="row__two graph__container"> </div> */}
      <div className="row__three graph__options">
        <div className="checkbox__container">
          <input
            type="checkbox"
            id={"totalViews"}
            name={"totalViews"}
            onChange={(e) => changeAnalyticsOptions(e)}
          />
          <label for={"totalViews"}>{"Total Views"}</label>
        </div>
        <div className="checkbox__container">
          <input
            type="checkbox"
            id={"completedAppointments"}
            name={"completedAppointments"}
            onChange={(e) => changeAnalyticsOptions(e)}
          />
          <label for={"completedAppointments"}>
            {"Completed Appointments"}
          </label>
        </div>
        <div className="checkbox__container">
          <input
            type="checkbox"
            id={"cancelledAppointments"}
            name={"cancelledAppointments"}
            onChange={(e) => changeAnalyticsOptions(e)}
          />
          <label for={"cancelledAppointments"}>
            {"Cancelled Appointments"}
          </label>
        </div>
      </div>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={700}
          height={600}
          data={profileData}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedOptions?.indexOf("completedAppointments") !== -1 && (
            <Bar dataKey="completed" fill="#8884d8" />
          )}
          {selectedOptions?.indexOf("cancelledAppointments") !== -1 && (
            <Bar dataKey="cancelled" fill="#dd3333" />
          )}
          {selectedOptions?.indexOf("totalViews") !== -1 && (
            <Bar dataKey="views" fill="#998877" />
          )}
        </BarChart>
      </ResponsiveContainer>

      {/* </div> */}
    </div>
  );
};

export default ProfileAnalytics;
