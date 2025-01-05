import { Box, Card, CardContent, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Label,
} from "recharts"
import StatsService from "../../services/StatsService"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const Dashboard = () => {
  const statsServiceRef = useRef(new StatsService())
  const [studentStats, setStudentStats] = useState(null)
  const [scoreStats, setScoreStats] = useState(null)
  const [semesterStats, setSemesterStats] = useState(null)
  const [regressionData, setRegressionData] = useState(null)
  const [subjectPassRates, setSubjectPassRates] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [availableYears, setAvailableYears] = useState([])

  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        const response = await statsServiceRef.current.getAvailableYears()
        setAvailableYears(response.data.metadata)
        // Set the first year with complete semesters as default
        const defaultYear = response.data.metadata.find(y => y.hasCompleteSemesters)
        if (defaultYear) {
          setSelectedYear(defaultYear.year)
        }
      } catch (error) {
        console.error("Error fetching available years:", error)
      }
    }

    fetchAvailableYears()
  }, [])

  useEffect(() => {
    const fetchAllStats = async () => {
      if (!selectedYear) return

      try {
        const [
          studentStatsRes,
          scoreStatsRes,
          semesterStatsRes,
          regressionDataRes,
          subjectPassRatesRes,
        ] = await Promise.all([
          statsServiceRef.current.getStudentStats(selectedYear),
          statsServiceRef.current.getScoreStats(selectedYear),
          statsServiceRef.current.getCurrentSemesterStats(),
          statsServiceRef.current.getRegressionData(selectedYear),
          statsServiceRef.current.getSubjectPassRates(selectedYear),
        ])

        setStudentStats(studentStatsRes.data.metadata)
        setScoreStats(scoreStatsRes.data.metadata)
        setSemesterStats(semesterStatsRes.data.metadata)
        setRegressionData(regressionDataRes.data.metadata)
        setSubjectPassRates(subjectPassRatesRes.data.metadata)
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchAllStats()
  }, [selectedYear])

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Box p={3}>
      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <Typography variant="h4">Thống kê</Typography>
        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel>Năm học</InputLabel>
          <Select
            value={selectedYear || ''}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Năm học"
          >
            {availableYears.map((year) => (
              <MenuItem 
                key={year.year} 
                value={year.year}
                disabled={!year.hasCompleteSemesters}
              >
                {`${year.year}-${year.year + 1}`}
                {!year.hasCompleteSemesters && " (Chưa đủ dữ liệu)"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thống kê học sinh
              </Typography>
              <Typography variant="body1" gutterBottom>
                Tổng số học sinh: {studentStats?.totalStudents || 0}
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={studentStats?.studentsPerClass || []}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Số học sinh" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Phân bố điểm số
              </Typography>
              <Typography variant="body1" gutterBottom>
                Tỷ lệ đạt: {scoreStats?.passRate}%
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={300}>
                    <Pie
                      data={scoreStats?.scoreDistribution || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {scoreStats?.scoreDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thống kê học kỳ {semesterStats?.semester} năm học {semesterStats?.schoolYear}
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={semesterStats?.subjectAverages || []}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Điểm trung bình" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tỷ lệ đạt theo môn học
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Box height={300}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={subjectPassRates?.subjectPassRates || []}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis domain={[0, 100]}>
                          <Label value="Tỷ lệ đạt (%)" angle={-90} position="left" />
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="passRate" fill="#8884d8" name="Tỷ lệ đạt" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box p={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Môn học có tỷ lệ đạt cao nhất:
                    </Typography>
                    <Typography variant="body1" color="primary">
                      {subjectPassRates?.highestPassRate?.subject}:{" "}
                      {subjectPassRates?.highestPassRate?.passRate}% (
                      {subjectPassRates?.highestPassRate?.totalStudents} học sinh)
                    </Typography>
                    <Box mt={2} />
                    <Typography variant="subtitle1" gutterBottom>
                      Môn học có tỷ lệ đạt thấp nhất:
                    </Typography>
                    <Typography variant="body1" color="error">
                      {subjectPassRates?.lowestPassRate?.subject}:{" "}
                      {subjectPassRates?.lowestPassRate?.passRate}% (
                      {subjectPassRates?.lowestPassRate?.totalStudents} học sinh)
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Phân tích tương quan điểm số
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    Điểm trung bình 2 lần 15' vs Điểm TB (r ={" "}
                    {regressionData?.correlations?.quarterPoints})
                  </Typography>
                  <Box height={250}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 20,
                        }}
                      >
                        <CartesianGrid />
                        <XAxis
                          type="number"
                          dataKey="x"
                          name="Điểm trung bình 2 lần 15'"
                          domain={[0, 10]}
                        >
                          <Label value="Điểm trung bình 2 lần 15'" offset={0} position="bottom" />
                        </XAxis>
                        <YAxis type="number" dataKey="y" name="Điểm TB" domain={[0, 10]}>
                          <Label value="Điểm TB" angle={-90} position="left" />
                        </YAxis>
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter
                          name="Điểm số"
                          data={regressionData?.data?.quarterPoints || []}
                          fill="#8884d8"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    Điểm 1 tiết vs Điểm TB (r = {regressionData?.correlations?.periodPoints})
                  </Typography>
                  <Box height={250}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 20,
                        }}
                      >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="Điểm 1 tiết" domain={[0, 10]}>
                          <Label value="Điểm 1 tiết" offset={0} position="bottom" />
                        </XAxis>
                        <YAxis type="number" dataKey="y" name="Điểm TB" domain={[0, 10]}>
                          <Label value="Điểm TB" angle={-90} position="left" />
                        </YAxis>
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter
                          name="Điểm số"
                          data={regressionData?.data?.periodPoints || []}
                          fill="#82ca9d"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    Điểm cuối kỳ vs Điểm TB (r = {regressionData?.correlations?.finalExamPoints})
                  </Typography>
                  <Box height={250}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{
                          top: 20,
                          right: 20,
                          bottom: 20,
                          left: 20,
                        }}
                      >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="Điểm cuối kỳ" domain={[0, 10]}>
                          <Label value="Điểm cuối kỳ" offset={0} position="bottom" />
                        </XAxis>
                        <YAxis type="number" dataKey="y" name="Điểm TB" domain={[0, 10]}>
                          <Label value="Điểm TB" angle={-90} position="left" />
                        </YAxis>
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter
                          name="Điểm số"
                          data={regressionData?.data?.finalExamPoints || []}
                          fill="#FF8042"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
