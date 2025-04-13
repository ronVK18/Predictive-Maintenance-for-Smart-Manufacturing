import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Briefcase, Sun, Moon } from "lucide-react";

// Dummy worker data with tasks
const workers = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Machine Operator",
    photo: "https://image.pollinations.ai/prompt/professional%20machine%20operator%20worker%20headshot",
    tasks: [
      { date: "2025-04-13", type: "Maintenance", duration: "4h", location: "Assembly Line A" },
      { date: "2025-04-14", type: "Production", duration: "8h", location: "Station 2" },
      { date: "2025-04-16", type: "Quality Check", duration: "6h", location: "QA Department" }
    ]
  },
  {
    id: 2,
    name: "Sarah Miller",
    position: "Technician",
    photo: "https://image.pollinations.ai/prompt/female%20factory%20technician%20portrait",
    tasks: [
      { date: "2025-04-13", type: "Repair", duration: "7h", location: "Warehouse B" },
      { date: "2025-04-15", type: "Installation", duration: "5h", location: "New Line Setup" },
      { date: "2025-04-17", type: "Calibration", duration: "3h", location: "Testing Lab" }
    ]
  },
  {
    id: 3,
    name: "Miguel Sanchez",
    position: "Supervisor",
    photo: "https://image.pollinations.ai/prompt/hispanic%20factory%20supervisor%20headshot",
    tasks: [
      { date: "2025-04-14", type: "Team Meeting", duration: "2h", location: "Conference Room" },
      { date: "2025-04-15", type: "Inspection", duration: "4h", location: "Assembly Line B" },
      { date: "2025-04-16", type: "Training", duration: "6h", location: "Training Center" }
    ]
  },
  {
    id: 4,
    name: "Lisa Chen",
    position: "Material Handler",
    photo: "https://image.pollinations.ai/prompt/asian%20female%20warehouse%20worker%20portrait",
    tasks: [
      { date: "2025-04-13", type: "Inventory", duration: "8h", location: "Warehouse A" },
      { date: "2025-04-16", type: "Delivery", duration: "4h", location: "Production Floor" },
      { date: "2025-04-17", type: "Restocking", duration: "6h", location: "Supply Room" }
    ]
  },
  {
    id: 5,
    name: "Jamal Williams",
    position: "Quality Control",
    photo: "https://image.pollinations.ai/prompt/african%20american%20quality%20control%20inspector%20headshot",
    tasks: [
      { date: "2025-04-13", type: "Inspection", duration: "6h", location: "Final Testing" },
      { date: "2025-04-15", type: "Quality Check", duration: "8h", location: "Line C" },
      { date: "2025-04-18", type: "Documentation", duration: "4h", location: "QA Office" }
    ]
  },
  {
    id: 6,
    name: "Emma Rodriguez",
    position: "Line Manager",
    photo: "https://image.pollinations.ai/prompt/confident%20female%20factory%20manager%20portrait",
    tasks: [
      { date: "2025-04-14", type: "Performance Review", duration: "5h", location: "HR Department" },
      { date: "2025-04-15", type: "Team Meeting", duration: "2h", location: "Meeting Room B" },
      { date: "2025-04-17", type: "Production Planning", duration: "4h", location: "Planning Office" }
    ]
  },
  {
    id: 7,
    name: "David Kim",
    position: "Maintenance Technician",
    photo: "https://image.pollinations.ai/prompt/asian%20male%20maintenance%20technician%20portrait",
    tasks: [
      { date: "2025-04-13", type: "Equipment Repair", duration: "5h", location: "Machine Shop" },
      { date: "2025-04-16", type: "Preventive Maintenance", duration: "8h", location: "Assembly Line A" },
      { date: "2025-04-19", type: "Installation", duration: "6h", location: "New Equipment Area" }
    ]
  },
  {
    id: 8,
    name: "Olivia Thompson",
    position: "Safety Officer",
    photo: "https://image.pollinations.ai/prompt/female%20safety%20officer%20industrial%20setting%20portrait",
    tasks: [
      { date: "2025-04-14", type: "Safety Inspection", duration: "7h", location: "Entire Facility" },
      { date: "2025-04-17", type: "Safety Training", duration: "3h", location: "Training Room" },
      { date: "2025-04-19", type: "Documentation", duration: "4h", location: "Safety Office" }
    ]
  },
  {
    id: 9,
    name: "Robert Singh",
    position: "Logistics Coordinator",
    photo: "https://image.pollinations.ai/prompt/indian%20male%20logistics%20professional%20headshot",
    tasks: [
      { date: "2025-04-15", type: "Shipment Planning", duration: "6h", location: "Logistics Office" },
      { date: "2025-04-16", type: "Inventory Audit", duration: "5h", location: "Warehouse C" },
      { date: "2025-04-18", type: "Supplier Meeting", duration: "2h", location: "Conference Room A" }
    ]
  },
  {
    id: 10,
    name: "Maria Gonzalez",
    position: "Process Engineer",
    photo: "https://image.pollinations.ai/prompt/latina%20engineer%20professional%20headshot",
    tasks: [
      { date: "2025-04-13", type: "Process Optimization", duration: "6h", location: "Engineering Lab" },
      { date: "2025-04-15", type: "Data Analysis", duration: "4h", location: "Technical Office" },
      { date: "2025-04-17", type: "Team Meeting", duration: "2h", location: "Engineering Department" }
    ]
  },
  {
    id: 11,
    name: "James Wilson",
    position: "Forklift Operator",
    photo: "https://image.pollinations.ai/prompt/forklift%20operator%20safety%20gear%20portrait",
    tasks: [
      { date: "2025-04-14", type: "Material Transport", duration: "8h", location: "Loading Dock" },
      { date: "2025-04-16", type: "Training", duration: "3h", location: "Warehouse Training Area" },
      { date: "2025-04-18", type: "Inventory Movement", duration: "6h", location: "Warehouse B" }
    ]
  },
  {
    id: 12,
    name: "Sophie Ahmed",
    position: "Production Planner",
    photo: "https://image.pollinations.ai/prompt/middle%20eastern%20female%20office%20worker%20headshot",
    tasks: [
      { date: "2025-04-13", type: "Schedule Planning", duration: "5h", location: "Planning Office" },
      { date: "2025-04-15", type: "Resource Allocation", duration: "4h", location: "Management Suite" },
      { date: "2025-04-17", type: "Status Meeting", duration: "2h", location: "Conference Room B" }
    ]
  }]

// Task type colors
const taskColors = {
  "Maintenance": "bg-blue-500",
  "Production": "bg-green-500",
  "Quality Check": "bg-purple-500",
  "Repair": "bg-red-500",
  "Installation": "bg-yellow-500",
  "Calibration": "bg-pink-500",
  "Team Meeting": "bg-indigo-500",
  "Inspection": "bg-teal-500",
  "Training": "bg-orange-500",
  "Inventory": "bg-cyan-500",
  "Delivery": "bg-lime-500",
  "Restocking": "bg-amber-500",

  "Documentation": "bg-violet-500",
  "Equipment Repair": "bg-red-600",
  "Preventive Maintenance": "bg-blue-600",
  "Safety Inspection": "bg-red-500",
  "Safety Training": "bg-orange-600",
  "Shipment Planning": "bg-emerald-500",
  "Inventory Audit": "bg-cyan-600",

};

export default function FactCalendar() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);

  // Generate calendar days for current month
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startOffset = firstDay.getDay();
    
    const days = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      days.push(dayDate);
    }
    
    setCalendarDays(days);
  }, [currentDate]);

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  // Check if a date has tasks
  const hasTasksOnDate = (date) => {
    if (!date) return false;
    const formattedDate = formatDate(date);
    return workers.some(worker => 
      worker.tasks.some(task => task.date === formattedDate)
    );
  };

  // Get tasks for selected date
  const getTasksForDate = (date) => {
    const formattedDate = formatDate(date);
    const tasksForDate = [];
    
    workers.forEach(worker => {
      worker.tasks.forEach(task => {
        if (task.date === formattedDate) {
          tasksForDate.push({
            ...task,
            worker: { ...worker }
          });
        }
      });
    });
    
    return tasksForDate;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Get tasks for selected date
  const tasksForSelectedDate = getTasksForDate(new Date(selectedDate));

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Calendar className="mr-2" /> Factory Task Calendar
          </h1>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Calendar Section */}
        <div className={`backdrop-blur-lg bg-opacity-20 rounded-xl shadow-xl overflow-hidden mb-8 ${darkMode ? 'bg-gray-800 shadow-blue-900/20' : 'bg-white shadow-gray-300/50'}`}>
          {/* Calendar Header */}
          <div className="flex justify-between items-center p-4 border-b border-opacity-20 border-gray-500">
            <button 
              onClick={prevMonth} 
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              &lt; Prev
            </button>
            <h2 className="text-xl font-bold">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h2>
            <button 
              onClick={nextMonth} 
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              Next &gt;
            </button>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={`p-2 text-center font-medium ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className={`p-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>;
              }
              
              const isToday = formatDate(day) === formatDate(new Date());
              const isSelected = formatDate(day) === selectedDate;
              const hasTasks = hasTasksOnDate(day);
              
              return (
                <div 
                  key={formatDate(day)}
                  onClick={() => setSelectedDate(formatDate(day))}
                  className={`
                    p-2 min-h-16 relative cursor-pointer hover:bg-opacity-80
                    ${isSelected ? (darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100') : (darkMode ? 'bg-gray-800' : 'bg-white')}
                    ${isToday ? (darkMode ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-400') : ''}
                  `}
                >
                  <div className="font-medium">{day.getDate()}</div>
                  {hasTasks && (
                    <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Tasks for Selected Date */}
        <div className={`backdrop-blur-lg bg-opacity-30 rounded-xl shadow-xl p-4 ${darkMode ? 'bg-gray-800/60 shadow-blue-900/20' : 'bg-white/90 shadow-gray-300/50'}`}>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Clock className="mr-2" /> 
            Tasks for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h2>
          
          {tasksForSelectedDate.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasksForSelectedDate.map((task, index) => (
                <div 
                  key={`${task.worker.id}-${index}`}
                  className={`rounded-xl p-4 shadow-lg backdrop-blur-lg transition-transform hover:scale-105 ${darkMode ? 'bg-gray-700/70' : 'bg-gray-100/80'}`}
                >
                  <div className="flex items-center mb-3">
                    <img 
                      src={task.worker.photo} 
                      alt={task.worker.name} 
                      className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-300"
                    />
                    <div>
                      <h3 className="font-bold">{task.worker.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{task.worker.position}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Briefcase size={16} className="mr-2" />
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${taskColors[task.type]} text-white`}>
                      {task.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">Duration: {task.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm">Location: {task.location}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center p-8 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
              <p className="text-lg">No tasks scheduled for this date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}