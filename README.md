# FLEX Student Portal 

A mobile-first academic monitoring and attendance tracking dashboard built with React Native and Expo. Designed to reimagined the traditional FLEX portal with interactive data visualization and threshold risk monitoring.

## Key Features
- **Executive Dashboard:** Visualizes course-wise attendance completion using `ProgressChart` and internal evaluation marks using `BarChart` via `react-native-chart-kit`.

- **Attendance Registry & Filters:** Searchable course list with real-time status badges (`Safe Standing` vs `At Risk (<80%)`) and category chips (`All`, `At Risk`, `Safe`).

- **Interactive State Mutation:** In-app `+ Mark Present` trigger that dynamically recalculates attendance standing across the entire app and instantly refreshes the charts.

- **Bunk Planner & Attendance Simulator:** Dedicated mathematical tool with input validation to calculate allowable absences or consecutive lectures required to maintain the mandatory 80% threshold.

- **Pure React State Architecture:** Implements tab switching via standard declarative React `useState` conditional rendering, strictly adhering to course constraints without external navigation libraries.

##  Tech Stack
- **Framework:** React Native (Expo)
- **Visualization:** `react-native-chart-kit`, `react-native-svg`
- **Language & Paradigms:** JavaScript (ES6+), React Hooks (`useState`), Component-driven architecture

## Setup & Execution
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/Zeenab-Tahir/SMD_A-1_Flex
   cd FlexRadar