import { Request, Response } from 'express';
import Materials from '../Models/Materials.model';

// Contrôleur pour la création d'un nouveau matériau
export const createMaterial = async (req: Request, res: Response) => {
  try {
    const { name, etudiants, number, date } = req.body;
    const material = new Materials({ name, etudiants, number, date });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du matériau' });
  }
};

// Contrôleur pour la récupération de tous les matériaux
export const getMaterials = async (req: Request, res: Response) => {
  try {
    const materials = await Materials.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des matériaux' });
  }
};

// Contrôleur pour la récupération d'un matériau par ID
export const getMaterialById = async (req: Request, res: Response) => {
  const materialId = req.params.id;
  try {
    const material = await Materials.findById(materialId);
    if (!material) {
      return res.status(404).json({ error: 'Matériau non trouvé' });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du matériau' });
  }
};

// Contrôleur pour la mise à jour d'un matériau par ID
export const updateMaterial = async (req: Request, res: Response) => {
  const materialId = req.params.id;
  try {
    const updatedMaterial = await Materials.findByIdAndUpdate(materialId, req.body, { new: true });
    if (!updatedMaterial) {
      return res.status(404).json({ error: 'Matériau non trouvé' });
    }
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du matériau' });
  }
};

// Contrôleur pour la suppression d'un matériau par ID
export const deleteMaterial = async (req: Request, res: Response) => {
  const materialId = req.params.id;
  try {
    const deletedMaterial = await Materials.findByIdAndRemove(materialId);
    if (!deletedMaterial) {
      return res.status(404).json({ error: 'Matériau non trouvé' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du matériau' });
  }
};
