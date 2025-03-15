"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddProductMutation,
  useSingleProductQuery,
  useUpdateProductMutation,
} from "@/Redux/Api/productApi";
import ShowToastify from "@/utils/ShowToastify";
import { ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/Redux/Api/categoryApi";

const schema = z.object({
  name: z.string().min(1, "Product Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .default(0)
    .optional(),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .default(0)
    .optional(),
  status: z.string().default("ACTIVE"),
  size: z.string().optional(),
  color: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  gender: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddProduct() {
  const [category, setCategory] = useState<string>("");
  const { id } = useParams();
  const { result } = useSingleProductQuery(id, {
    selectFromResult: ({ data }) => ({
      result: data?.data,
    }),
  });

  const { categories, categoryLoading } = useGetCategoriesQuery("", {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.data,
      categoryLoading: isLoading,
    }),
  });

  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);

  const [addProductFn] = useAddProductMutation();
  const [updateProductFn] = useUpdateProductMutation();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      color: "",
      size: "",
      gender: "",
      price: 0,
      stock: 0,
      description: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (result) {
      reset({
        name: result.name || "",
        category: result.category || "",
        color: result.color || "",
        gender: result.gender || "",
        size: result.size.join(",") || "",
        price: result.price || undefined,
        description: result.description || "",
        status: result.status || "ACTIVE",
      });
      setThumbnailImage(result?.thumbnail);
      setProductImages(result?.images || []);
    }
  }, [result, reset]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();

    // Convert size string to array
    const sizeArray = data.size
      ? data.size.split(",").map((s) => s.trim())
      : [];
    const productData = { ...data, size: sizeArray };
    console.log(productData);
    

    formData.append("bodyData", JSON.stringify(productData));

    if (thumbnailFile) {
      formData.append("thumbnailImage", thumbnailFile);
    }

    productImageFiles.forEach((file) => {
      formData.append("productImages", file);
    });

    if (result) {
      const { error, data: res } = await updateProductFn({
        id: result?.id,
        data: formData,
      });

      if (error) {
        ShowToastify({ error: "Failed to update product" });
        setLoading(false);
        return;
      }

      if (res) {
        ShowToastify({ success: "Product updated successfully" });
      }
      return;
    }

    const { error, data: res } = await addProductFn(formData);

    if (error) {
      ShowToastify({ error: "Failed to add product" });
      setLoading(false);
      return;
    }

    if (res) {
      reset();
      setThumbnailImage(null);
      setThumbnailFile(null);
      setProductImages([]);
      setProductImageFiles([]);
      ShowToastify({ success: "Product added successfully" });
    }
    setLoading(false);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = () => setThumbnailImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProductImagesUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    setProductImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setProductImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeThumbnail = () => {
    setThumbnailImage(null);
    setThumbnailFile(null);
  };

  const removeProductImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setProductImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 mx-auto rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-20"
      >
        <div className="space-y-6">
          {/* Thumbnail Image Upload */}
          <div className="relative w-full mx-auto">
            {thumbnailImage ? (
              <div className="relative w-full h-60 border border-gray-300 rounded-lg overflow-hidden">
                <Image
                  src={thumbnailImage}
                  alt="Thumbnail Preview"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                  type="button"
                  onClick={removeThumbnail}
                >
                  <MdDelete size={24} />
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-semibold mb-2 text-center">
                  Thumbnail
                </h1>
                <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 transition">
                  <span className="text-gray-600">Drag and drop or</span>
                  <span className="mt-2 px-4 py-2 bg-primary text-white rounded-lg">
                    Select
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                  />
                </label>
              </>
            )}
          </div>

          {/* Product Images Upload */}
          <div className="relative w-full mx-auto">
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Product Images
            </h1>
            <div className="">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-40 border border-gray-300 rounded-lg overflow-hidden gap-4 mb-4"
                >
                  <Image
                    src={image}
                    alt={`Product ${index + 1}`}
                    width={200}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                    type="button"
                    onClick={() => removeProductImage(index)}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 transition">
                <span className="text-gray-600">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleProductImagesUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-4 col-span-2">
          <div>
            <label className="text-[17px] leading-6">Product Title</label>
            <input
              {...register("name")}
              placeholder="Product Title"
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[17px] leading-6">Gender</label>
              <select
                {...register("gender")}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full"
              >
                <option value="">Select a category</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div>
              <label className="text-[17px] leading-6">Category</label>
              <select
                {...register("category")}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full"
              >
                <option value="">Select a category</option>
                {categoryLoading
                  ? "loading"
                  : categories?.map(
                      (category: { id: string; name: string }) => (
                        <option key={category.id} value={category.name}>
                          {category.name.toLowerCase()}
                        </option>
                      )
                    )}
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[17px] leading-6">Product Color</label>
              <input
                {...register("color")}
                placeholder="Color"
                required={false}
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              {errors.color && (
                <p className="text-red-500">{errors.color.message}</p>
              )}
            </div>
            <div>
              <label className="text-[17px] leading-6">
                Product Size (S, M, L, XL etc..)
              </label>
              <input
                {...register("size")}
                placeholder="Size (comma separated)"
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              {errors.size && (
                <p className="text-red-500">{errors.size.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[17px] leading-6">Product Price</label>
              <input
                {...register("price", { valueAsNumber: true })}
                placeholder="Price"
                type="number"
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="text-[17px] leading-6">Stock</label>
              <input
                {...register("stock", { valueAsNumber: true })}
                placeholder="Stock"
                type="number"
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              {errors.stock && (
                <p className="text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-[17px] leading-6">Description</label>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="p-3 border border-gray-300 rounded-lg w-full h-24"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : result
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
