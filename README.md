# AIA G702/G703 Form Generator

A web-based application for generating AIA G702 (Application and Certificate for Payment) and G703 (Continuation Sheet) forms for construction projects. The application also includes functionality for managing general conditions and creating job cost curves.

## Features

- **Project Information Management**: Enter and manage project details, contractor information, owner information, and architect information.
- **AIA G702 Form**: Complete Application and Certificate for Payment form with automatic calculations for contract sums, retainage, and payments due.
- **AIA G703 Form**: Detailed continuation sheet with line items for work completed, stored materials, and percentage completion tracking.
- **General Conditions**: Track and manage general conditions/requirements with budget amounts, billed amounts, and completion percentages.
- **Job Cost Curve**: Generate and visualize project cost distribution over time with various curve options (bell curve, front-loaded, back-loaded, or linear).
- **Preview & Export**: Preview all forms before exporting and export as PDF or CSV for sharing and record-keeping.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge recommended)
- Internet connection (for loading CDN resources)

### Installation

1. Clone this repository or download the files:
```
git clone https://github.com/ibuilder/AIAG702G703.git
```

2. Open the `index.html` file in your web browser or host the files on a web server.

## Usage

### Project Information

1. Fill out the project details in the "Project Info" tab including:
   - Project name, location, and number
   - Contract date
   - Application information (number, date, period)
   - Contractor, owner, and architect information

### G702 Form

1. Enter the original contract sum and any change orders
2. Add details for retainage percentage
3. Enter previous payment certificates
4. The application will automatically calculate the current payment due and balance to finish

### G703 Form

1. Add line items for each portion of work by clicking "Add Line Item"
2. Enter the scheduled value, previous work completed, current work completed, and materials stored
3. The application will automatically calculate totals, percentages, and balances

### General Conditions

1. Add general conditions items by clicking "Add General Condition Item"
2. Enter budget amounts, previous billed amounts, and current billed amounts
3. Track completion percentages and remaining balances

### Job Cost Curve

1. Enter the project start and end dates
2. Input the total project cost
3. Select a distribution type (Bell Curve, Front-Loaded, Back-Loaded, or Linear)
4. Click "Generate Cost Curve" to create a visual projection of costs over time

### Preview & Export

1. Navigate to the "Preview & Export" tab to see how the forms will look
2. Use the tabs to switch between previewing G702, G703, General Conditions, and Job Cost Curve
3. Click "Export as PDF" to download the currently visible form as a PDF
4. Click "Export as CSV" to download the data as a CSV file for spreadsheet applications

## File Structure

- `index.html` - The main HTML file with the application structure
- `styles.css` - Cascading Style Sheet for formatting the application
- `script.js` - JavaScript file that contains all the application logic

## Dependencies

This application uses the following libraries loaded via CDN:

- [Bootstrap 5.3.0](https://getbootstrap.com/) - For responsive layout and UI components
- [Font Awesome 6.0.0](https://fontawesome.com/) - For icons
- [jsPDF 2.5.1](https://github.com/parallax/jsPDF) - For PDF generation
- [html2canvas 1.4.1](https://html2canvas.hertzen.com/) - For converting HTML to canvas for PDF export
- [PapaParse 5.3.2](https://www.papaparse.com/) - For CSV generation
- [Chart.js 3.9.1](https://www.chartjs.org/) - For creating the job cost curve charts

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- American Institute of Architects (AIA) for the original G702 and G703 form designs
- Chart.js developers for the visualization library
- Bootstrap team for the responsive UI framework

## Support

For questions or support, please open an issue in the repository or contact the developer at your@email.com.
