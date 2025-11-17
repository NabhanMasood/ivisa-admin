# Migration Guide: Adding customerId to Payments Table

## Problem
TypeORM is trying to add a NOT NULL `customerId` column to the `payments` table, but existing payments would have null values, causing the migration to fail.

## Solution
We need to perform a multi-step migration:
1. Add the column as nullable
2. Populate existing records with customerId from their related applications
3. Make the column required (NOT NULL)

---

## Step 1: Update Payment Entity (Temporary - Make nullable)

First, update your `payment.entity.ts` to make `customerId` nullable:

```typescript
@Column({ nullable: true })
customerId: number;
```

Or with the relation:

```typescript
@ManyToOne(() => Customer, { nullable: true })
@JoinColumn({ name: 'customerId' })
customer: Customer;

@Column({ nullable: true })
customerId: number;
```

---

## Step 2: Create Migration - Add Nullable Column

Create a migration file (e.g., `XXXXXX-AddCustomerIdToPayments.ts`):

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomerIdToPayments1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add the column as nullable
    await queryRunner.query(`
      ALTER TABLE "payments" 
      ADD COLUMN "customerId" integer NULL
    `);

    // Step 2: Add foreign key constraint (optional, can be added later)
    // await queryRunner.query(`
    //   ALTER TABLE "payments" 
    //   ADD CONSTRAINT "FK_payments_customerId" 
    //   FOREIGN KEY ("customerId") REFERENCES "customers"("id") 
    //   ON DELETE SET NULL ON UPDATE CASCADE
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove foreign key constraint if added
    // await queryRunner.query(`
    //   ALTER TABLE "payments" 
    //   DROP CONSTRAINT "FK_payments_customerId"
    // `);

    // Remove the column
    await queryRunner.query(`
      ALTER TABLE "payments" 
      DROP COLUMN "customerId"
    `);
  }
}
```

---

## Step 3: Populate Existing Records

Create a data migration (e.g., `XXXXXX-PopulateCustomerIdInPayments.ts`):

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateCustomerIdInPayments1234567891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update payments with customerId from their related applications
    // Assuming you have an applicationId column that relates to visa_applications table
    // and visa_applications table has a customerId column
    
    await queryRunner.query(`
      UPDATE "payments" p
      SET "customerId" = va."customerId"
      FROM "visa_applications" va
      WHERE p."applicationId" = va."id"
        AND p."customerId" IS NULL
        AND va."customerId" IS NOT NULL
    `);

    // If your structure is different, adjust the query accordingly
    // For example, if applications are in a different table:
    // await queryRunner.query(`
    //   UPDATE "payments" p
    //   SET "customerId" = a."customerId"
    //   FROM "applications" a
    //   WHERE p."applicationId" = a."id"
    //     AND p."customerId" IS NULL
    //     AND a."customerId" IS NOT NULL
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Set all customerId to NULL (reversible operation)
    await queryRunner.query(`
      UPDATE "payments" 
      SET "customerId" = NULL
    `);
  }
}
```

---

## Step 4: Make Column Required (NOT NULL)

Create another migration (e.g., `XXXXXX-MakeCustomerIdRequired.ts`):

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeCustomerIdRequired1234567892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, ensure all payments have a customerId
    // Handle any orphaned payments (payments without applications)
    // You can either:
    // 1. Delete them
    // 2. Assign them to a default customer
    // 3. Keep them nullable (skip this step)

    // Option 1: Delete orphaned payments (uncomment if you want this)
    // await queryRunner.query(`
    //   DELETE FROM "payments" 
    //   WHERE "customerId" IS NULL
    // `);

    // Option 2: Assign to default customer (uncomment if you want this)
    // Replace 1 with your default customer ID
    // await queryRunner.query(`
    //   UPDATE "payments" 
    //   SET "customerId" = 1
    //   WHERE "customerId" IS NULL
    // `);

    // If you have orphaned payments you want to keep, you might want to
    // keep the column nullable and handle them in your application logic

    // Make the column NOT NULL (only if you're sure all records have customerId)
    await queryRunner.query(`
      ALTER TABLE "payments" 
      ALTER COLUMN "customerId" SET NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Make the column nullable again
    await queryRunner.query(`
      ALTER TABLE "payments" 
      ALTER COLUMN "customerId" DROP NOT NULL
    `);
  }
}
```

---

## Step 5: Update Payment Entity (Final - Make required)

After the migrations run successfully, update your `payment.entity.ts` to make `customerId` required:

```typescript
@ManyToOne(() => Customer)
@JoinColumn({ name: 'customerId' })
customer: Customer;

@Column()
customerId: number;
```

Or if you decide to keep it nullable (for orphaned payments):

```typescript
@ManyToOne(() => Customer, { nullable: true })
@JoinColumn({ name: 'customerId' })
customer: Customer;

@Column({ nullable: true })
customerId: number;
```

---

## Alternative: Single Migration Approach

If you prefer a single migration file, combine all steps:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomerIdToPayments1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add the column as nullable
    await queryRunner.query(`
      ALTER TABLE "payments" 
      ADD COLUMN "customerId" integer NULL
    `);

    // Step 2: Populate existing records
    await queryRunner.query(`
      UPDATE "payments" p
      SET "customerId" = va."customerId"
      FROM "visa_applications" va
      WHERE p."applicationId" = va."id"
        AND p."customerId" IS NULL
        AND va."customerId" IS NOT NULL
    `);

    // Step 3: Add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "payments" 
      ADD CONSTRAINT "FK_payments_customerId" 
      FOREIGN KEY ("customerId") REFERENCES "customers"("id") 
      ON DELETE SET NULL ON UPDATE CASCADE
    `);

    // Step 4: Handle orphaned payments (choose one approach)
    // Option A: Delete orphaned payments
    // await queryRunner.query(`
    //   DELETE FROM "payments" 
    //   WHERE "customerId" IS NULL
    // `);

    // Option B: Assign to default customer (replace 1 with actual default customer ID)
    // await queryRunner.query(`
    //   UPDATE "payments" 
    //   SET "customerId" = 1
    //   WHERE "customerId" IS NULL
    // `);

    // Step 5: Make column NOT NULL (only if you handled orphaned payments above)
    // If you keep orphaned payments, skip this step
    // await queryRunner.query(`
    //   ALTER TABLE "payments" 
    //   ALTER COLUMN "customerId" SET NOT NULL
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "payments" 
      DROP CONSTRAINT IF EXISTS "FK_payments_customerId"
    `);

    // Remove the column
    await queryRunner.query(`
      ALTER TABLE "payments" 
      DROP COLUMN "customerId"
    `);
  }
}
```

---

## Running the Migrations

```bash
# Generate migration (if using TypeORM CLI)
npm run typeorm migration:generate -- -n AddCustomerIdToPayments

# Or create manually and run
npm run typeorm migration:run
```

---

## Verification Queries

After running migrations, verify the data:

```sql
-- Check for payments without customerId
SELECT COUNT(*) FROM "payments" WHERE "customerId" IS NULL;

-- Check payments with customerId
SELECT COUNT(*) FROM "payments" WHERE "customerId" IS NOT NULL;

-- Verify the relationship
SELECT p.id, p."orderId", p."customerId", c."fullname", c.email
FROM "payments" p
LEFT JOIN "customers" c ON p."customerId" = c.id
LIMIT 10;
```

---

## Notes

1. **Backup First**: Always backup your database before running migrations
2. **Test in Development**: Test migrations in a development environment first
3. **Handle Orphaned Payments**: Decide how to handle payments without applications (delete, assign to default customer, or keep nullable)
4. **Foreign Key Constraints**: Consider whether you want cascade deletes or SET NULL behavior
5. **Index**: Consider adding an index on `customerId` for better query performance:
   ```sql
   CREATE INDEX "IDX_payments_customerId" ON "payments" ("customerId");
   ```

---

## Troubleshooting

### Error: Column "customerId" contains null values
- Solution: You skipped Step 3 (populating existing records) or Step 4 (handling orphaned payments)
- Fix: Either populate the data first or keep the column nullable

### Error: Foreign key constraint fails
- Solution: Some payments reference non-existent customers
- Fix: Clean up invalid references before adding the foreign key constraint

### Error: Duplicate migration
- Solution: Migration file names must be unique
- Fix: Use a different timestamp in the filename

