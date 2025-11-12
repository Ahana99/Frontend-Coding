/**
 * Problem:
    You have a button in your template:
        <button (click)="toggleStatus(1)">Toggle Status</button>
        <p>{{ getStatus(1) }}</p>
    In the component, maintain a Map<number, boolean> called statuses. Implement toggleStatus and getStatus so the button toggles between "Active" and "Inactive".

    Expected Behavior:
    - First click: "Active"
    - Second click: "Inactive"
    - Third click: "Active" … and so on.
 */

export class StatusComponent {
  statuses = new Map<number, boolean>();

  toggleStatus(id: number) {
    const curr = this.statuses.get(id) || false;
    this.statuses.set(id, !curr);
  }

  getStatus(id: number): string {
    return this.statuses.get(id)? 'Active' : 'Inactive';
  }
}
