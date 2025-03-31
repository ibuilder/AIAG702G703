// Global variables
let lineItems = [];
let gcItems = [];
let monthlyCosts = [];
let chart = null;
let previewChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // Set default dates
    const today = new Date();
    document.getElementById('applicationDate').valueAsDate = today;
    
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    document.getElementById('periodFrom').valueAsDate = firstDayOfMonth;
    document.getElementById('periodTo').valueAsDate = today;
    
    // Initialize the G703 table with a few line items
    addLineItem();
    
    // Initialize the General Conditions table with a few items
    addGCItem();
    
    // Add event listeners
    addEventListeners();
    
    // Calculate initial values
    calculateG702();
    calculateG703();
    calculateGC();
}

function addEventListeners() {
    // G702 form calculations
    document.getElementById('originalContractSum').addEventListener('input', calculateG702);
    document.getElementById('changeOrders').addEventListener('input', calculateG702);
    document.getElementById('totalCompleted').addEventListener('input', calculateG702);
    document.getElementById('retainagePercentage').addEventListener('input', calculateG702);
    document.getElementById('lessPayments').addEventListener('input', calculateG702);
    
    // Change order calculations
    document.getElementById('previousAdditions').addEventListener('input', calculateChangeOrders);
    document.getElementById('previousDeductions').addEventListener('input', calculateChangeOrders);
    document.getElementById('currentAdditions').addEventListener('input', calculateChangeOrders);
    document.getElementById('currentDeductions').addEventListener('input', calculateChangeOrders);
    
    // Add line item button for G703
    document.getElementById('addLineItem').addEventListener('click', addLineItem);
    
    // Add General Condition item button
    document.getElementById('addGCItem').addEventListener('click', addGCItem);
    
    // Generate cost curve button
    document.getElementById('generateCurve').addEventListener('click', generateCostCurve);
    
    // Export buttons
    document.getElementById('exportPdf').addEventListener('click', exportToPdf);
    document.getElementById('exportCsv').addEventListener('click', exportToCsv);
    
    // Tab navigation
    const previewTab = document.getElementById('preview-tab');
    previewTab.addEventListener('click', updatePreviews);
}

function moveToTab(tabId) {
    const tab = document.getElementById(tabId);
    const bsTab = new bootstrap.Tab(tab);
    bsTab.show();
    
    if (tabId === 'preview-tab') {
        updatePreviews();
    }
}

function calculateG702() {
    // Get input values
    const originalSum = parseFloat(document.getElementById('originalContractSum').value) || 0;
    const changeOrders = parseFloat(document.getElementById('changeOrders').value) || 0;
    const totalCompleted = parseFloat(document.getElementById('totalCompleted').value) || 0;
    const retainagePercentage = parseFloat(document.getElementById('retainagePercentage').value) || 0;
    const lessPayments = parseFloat(document.getElementById('lessPayments').value) || 0;
    
    // Calculate derived values
    const contractSum = originalSum + changeOrders;
    const retainageAmount = totalCompleted * (retainagePercentage / 100);
    const totalEarnedLessRetainage = totalCompleted - retainageAmount;
    const currentPaymentDue = totalEarnedLessRetainage - lessPayments;
    const balanceToFinish = contractSum - totalEarnedLessRetainage;
    
    // Update the form fields
    document.getElementById('contractSum').value = contractSum.toFixed(2);
    document.getElementById('retainageAmount').value = retainageAmount.toFixed(2);
    document.getElementById('totalEarnedLessRetainage').value = totalEarnedLessRetainage.toFixed(2);
    document.getElementById('currentPaymentDue').value = currentPaymentDue.toFixed(2);
    document.getElementById('balanceToFinish').value = balanceToFinish.toFixed(2);
}

function calculateChangeOrders() {
    // Get input values
    const previousAdditions = parseFloat(document.getElementById('previousAdditions').value) || 0;
    const previousDeductions = parseFloat(document.getElementById('previousDeductions').value) || 0;
    const currentAdditions = parseFloat(document.getElementById('currentAdditions').value) || 0;
    const currentDeductions = parseFloat(document.getElementById('currentDeductions').value) || 0;
    
    // Calculate totals
    const totalAdditions = previousAdditions + currentAdditions;
    const totalDeductions = previousDeductions + currentDeductions;
    const netChangeOrders = totalAdditions - totalDeductions;
    
    // Update the form fields
    document.getElementById('totalAdditions').value = totalAdditions.toFixed(2);
    document.getElementById('totalDeductions').value = totalDeductions.toFixed(2);
    document.getElementById('netChangeOrders').value = netChangeOrders.toFixed(2);
    document.getElementById('changeOrders').value = netChangeOrders.toFixed(2);
    
    // Recalculate G702
    calculateG702();
}

function addLineItem() {
    const lineItemsContainer = document.getElementById('lineItemsContainer');
    const itemNumber = lineItems.length + 1;
    
    const newLineItem = {
        id: 'item_' + Date.now(),
        itemNumber: itemNumber,
        description: '',
        scheduledValue: 0,
        previousWork: 0,
        currentWork: 0,
        materialsStored: 0,
        completedStored: 0,
        percentComplete: 0,
        balanceToFinish: 0,
        retainage: 0
    };
    
    lineItems.push(newLineItem);
    
    const row = document.createElement('tr');
    row.className = 'line-item-row';
    row.id = newLineItem.id;
    row.innerHTML = `
        <td>
            <input type="text" value="${itemNumber}" data-field="itemNumber" onchange="updateLineItem('${newLineItem.id}', 'itemNumber', this.value)">
        </td>
        <td>
            <input type="text" placeholder="Enter description" data-field="description" onchange="updateLineItem('${newLineItem.id}', 'description', this.value)">
        </td>
        <td>
            <input type="number" min="0" step="0.01" value="0.00" data-field="scheduledValue" onchange="updateLineItem('${newLineItem.id}', 'scheduledValue', this.value)">
        </td>
        <td>
            <input type="number" min="0" step="0.01" value="0.00" data-field="previousWork" onchange="updateLineItem('${newLineItem.id}', 'previousWork', this.value)">
        </td>
        <td>
            <input type="number" min="0" step="0.01" value="0.00" data-field="currentWork" onchange="updateLineItem('${newLineItem.id}', 'currentWork', this.value)">
        </td>
        <td>
            <input type="number" min="0" step="0.01" value="0.00" data-field="materialsStored" onchange="updateLineItem('${newLineItem.id}', 'materialsStored', this.value)">
        </td>
        <td>
            <input type="number" min="0" step="0.01" value="0.00" class="calculated" data-field="completedStored" readonly>
        </td>
        <td>
            <input type="number" min="0" max="100" step="0.1" value="0.0" class="calculated" data-field="percentComplete" readonly>
        </td>
        <td>
            <input type="number" min="0" step="0.01" value="0.00" class="calculated" data-field="balanceToFinish" readonly>
        </td>
        <td>
            <input type="number" min="0" step="0.01" value="0.00" class="calculated" data-field="retainage" readonly>
        </td>
        <td class="no-print">
            <button class="btn btn-sm btn-danger" onclick="removeLineItem('${newLineItem.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    lineItemsContainer.appendChild(row);
    calculateG703();
}

function updateLineItem(id, field, value) {
    const lineItem = lineItems.find(item => item.id === id);
    if (!lineItem) return;
    
    if (field === 'itemNumber' || field === 'description') {
        lineItem[field] = value;
    } else {
        lineItem[field] = parseFloat(value) || 0;
    }