import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column('float')
  temperature: number;

  @Column('float')
  humidity: number;

  @Column('int')
  lightIntensity: number;

  @Column('int')
  soilMoisture: number;

  @Column({ type: 'enum', enum: ['trees', 'vegetables', 'ornamentals'] })
  category: 'trees' | 'vegetables' | 'ornamentals';
}
